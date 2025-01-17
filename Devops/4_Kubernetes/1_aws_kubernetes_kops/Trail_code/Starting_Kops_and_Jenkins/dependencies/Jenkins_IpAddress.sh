#!/bin/bash


jenkinsInstanceId=i-07001644532cdca25

foundInstance=$(aws ec2 describe-instances --instance-ids $jenkinsInstanceId | jq '.Reservations | length')

if [[ $foundInstance = 0 ]]; then
echo "Jenkins Kops Instance Not Found"
echo "!!!! Check Jenkins Instance Id Again !!!!!!"
exit 0
else
echo "Found Jenkins Instance"
fi



ipaddress=$(aws ec2 describe-instances --instance-ids $jenkinsInstanceId | jq '.Reservations[].Instances[].PublicIpAddress' | grep -Eo "[0-9.]+"
)


if [[ $ipaddress == null ]]; then
	echo "Instance not running, Start Instance"
else
	echo "jenkins Instance Ip Address = $ipaddress"
fi
