#!/bin/bash

logsDir="./logs/describe-instances.json"

if [ ! -d $logsDir  ];then
   mkdir -p logs
   aws ec2 describe-instances > $logsDir
fi


# find Jenkins Tag value or Label Name
jenkins_Inst_TagValue=$(cat $logsDir | jq '.Reservations[].Instances[].Tags[].Value' | grep -E "Jenkins" | grep -Eo "[a-zA-Z-]+")


# find Jenkins Instanceid using Tags
jenkins_Inst_Id=$(cat $logsDir | jq --arg JenkinsLabel $jenkins_Inst_TagValue  '.Reservations[].Instances[] | select(.Tags[].Value==$JenkinsLabel)' | jq '.InstanceId' | grep -Eo "[0-9a-zA-Z-]+")

./findIp.sh -e Jenkins

if [[ $(echo $?) == 0 ]]; then
   echo "Jenkins Already Running"

   if [[ $1 == 'stop' ]]; then

        echo "**** Stoping Jenkins Instance *****"

        result=$(aws ec2 stop-instances --instance-ids $jenkins_Inst_Id)


        if [[ $? == 1 ]]; then
         echo "$result"
         exit 1
        fi


        echo "wait for 2 min and Check again"
	exit 0

   fi

   exit 0
fi




 echo "**** Starting Jenkins Instance *****"

 result=$(aws ec2 start-instances --instance-ids $jenkins_Inst_Id)

	
if [[ $? == 1 ]]; then        
 echo "$result"       
 exit 1
fi

echo "wait for 2 min and Check again"







