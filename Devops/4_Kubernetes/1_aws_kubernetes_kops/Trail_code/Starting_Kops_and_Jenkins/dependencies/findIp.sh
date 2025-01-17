#!/bin/bash

# Declaring Varibles
expression=""
aws_ec2_DescribeCommand="aws ec2 describe-instances"
aws_ec2_Describe_Error="Error Occured While executing aws describe instance Command"
aws_ec2_DescribeLogs_Loc="./logs/describe-instances.json"

jq_running_instances='.Reservations[].Instances[] | select(.State.Name=="running")'
jq_stopped_instances='.Reservations[].Instances[] | select(.State.Name=="stopped")'


#saving ec2 description of instance in file describe-instances
#Location is logs/

if [ ! -d ./logs ]; then
 mkdir -p logs
fi

commandOutput=$aws_ec2_DescribeCommand

if [[ $commandOutput == ""  ]]; then
 echo $aws_ec2_Describe_Error
 exit 1
fi

$commandOutput > $aws_ec2_DescribeLogs_Loc



# Find Running Instances

 runningInstances=$(cat $aws_ec2_DescribeLogs_Loc | jq "$jq_running_instances")



# Find Stopped Instances

 stoppedInstances=$(cat $aws_ec2_DescribeLogs_Loc | jq "$jq_stopped_instances")



# Check and use $1 Command Parameter

while getopts ":e:h" option; do
   case $option in
      e)# expression for label
	  expression=$OPTARG
	  ;;
      h)# helping arg
	  echo "Help ----------------------------------------"
	  echo ""
	  echo "-e  Option accepts RegexExpression of label mentioned for instance"
	  exit 0 ;;
   esac
done

if [[ $expression == "" ]]; then
   all_ip_address=$(echo "$runningInstances" | jq '.PublicIpAddress' | grep -Eo "[0-9.]+")

   for temp_ip_address in $all_ip_address
   do
	   instanceName=$(echo "$runningInstances" | jq --arg PublicIpAddress $temp_ip_address 'select(.PublicIpAddress==$PublicIpAddress)' | jq '.KeyName')

	   echo "$temp_ip_address  -- $instanceName"
   done


   exit 0
fi


if [[ $expression != "" ]]; then

  found_running_ins_label=$(echo "$runningInstances" | jq '.Tags[].Value' | grep -E "$expression" | grep -Eo "[a-zA-Z0-9-]+")
  
  
  # if not found Instance running

  if [[ $found_running_ins_label == "" ]]; then
     
     found_stopped_ins_label=$(echo "$stoppedInstances" | jq '.Tags[].Value' | grep -E "$expression" | grep -Eo "[a-zA-Z0-9-]+")
     
     if [[ $found_stopped_ins_label != "" ]]; then
	     echo "Your Instance is stopped kindly Start Instance $found_stopped_ins_label"
	     
	     exit 1
     else
	     echo "Wrong InstanceName  RegexExpression Given as Parameter1"
	     exit 1
     fi

  fi

  # if Found Instance  Running

  ip_address=$(echo "$runningInstances" | jq --arg foundLabel $found_running_ins_label 'select(.Tags[].Value==$foundLabel)' | jq '.PublicIpAddress' | grep -Eo "[0-9.]+" )
  echo "$ip_address"
  exit 0

fi


