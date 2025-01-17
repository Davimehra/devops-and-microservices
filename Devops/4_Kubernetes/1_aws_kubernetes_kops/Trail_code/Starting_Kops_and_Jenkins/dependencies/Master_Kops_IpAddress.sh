#!/bin/bash


masterInstanceId=i-0444727815b70e897

foundInstance=$(aws ec2 describe-instances --instance-ids $masterInstanceId | jq '.Reservations[] | length')

if [[ $foundInstance = 0 ]]; then
echo "Master Kops Instance Not Found"
echo "!!!! Check Master Instance Id Again !!!!!!"
exit 0
else
echo "Found Master Instance"
fi



ipaddress=$(aws ec2 describe-instances --instance-ids $masterInstanceId | jq '.Reservations[].Instances[].PublicIpAddress' | grep -Eo "[0-9.]+"
)

echo "Master Kops Instance Ip Address = $ipaddress"

