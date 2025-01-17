#!/bin/bash

logsDir="./logs/describe-instances.json"

if [ ! -d $logsDir  ];then
   mkdir -p logs
fi

# detailing aws Logs
aws ec2 describe-instances > $logsDir

# find Kops Tag value or Label Name
kops_Inst_TagValue=$(cat $logsDir | jq '.Reservations[].Instances[].Tags[].Value' | grep -E "Kops.*Master" | grep -Eo "[a-zA-Z-]+")


# find kops Instanceid using Tags
kops_Inst_Id=$(cat $logsDir | jq --arg kopsLabel $kops_Inst_TagValue  '.Reservations[].Instances[] | select(.Tags[].Value==$kopsLabel)' | jq '.InstanceId' | grep -Eo "[0-9a-zA-Z-]+")

./findIp.sh -e Kops.*Master

if [[ $(echo $?)  == 0 ]]; then
   echo "Kops Already Running"

   if [[ $1 == 'stop' ]]; then

        echo "**** Stoping Kops Instance *****"

        result=$(aws ec2 stop-instances --instance-ids $kops_Inst_Id)


        if [[ $? == 1 ]]; then
         echo "$result"
         exit 1
        fi


        echo "wait for 2 min and Check again"
	exit 0

   fi

   exit 0
fi




 echo "**** Starting Kops Instance *****"

 result=$(aws ec2 start-instances --instance-ids $kops_Inst_Id)

	
if [[ $? == 1 ]]; then        
 echo "$result"       
 exit 1
fi

echo "wait for 2 min and Check again"







