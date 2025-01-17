#!/bin/bash

masterKops_Key_Loc="/home/linuxdavi/.ssh/kops-master-node.pem"
userName="ubuntu"

echo ""
echo -n  "Finding Running instance with lable [Kops.*Master]"
echo ""


# Finding Ip of kops using 'findIp.sh' script

ipAddress=$(./findIp.sh -e Kops.*Master)

if [[ $(echo $?) == 0 ]]; then
   echo "Ip Founded"
else
   echo "Ip Not Found"
   exit 1
fi

# verify KeyLocation

if [[ ! -r $masterKops_Key_Loc ]]; then
 echo "Key Not found at '$masterKops_Key_Loc'"
 exit 1
fi

# Deleting Kops Command if $1 == 'stop'


if [[ $1 == 'delete' || $1 == 'stop' ]]; then

 echo ""
 echo "----------------"
 echo "Deleting Cluster"
 echo "----------------"

sudo ssh -o StrictHostKeyChecking=no  -i $masterKops_Key_Loc  ubuntu@$ipAddress -- "kops delete cluster --name=kops.basic-dev-ops-site-trial.co --state=s3://basic-kops-state --yes"

 echo "***** Cluster Deleted *******"
 exit 0
fi


# Initializing Kops CLuster
echo "------------------------------------------"
echo "Trying to Initiate Cluster in Kops Instance"
echo "------------------------------------------"
echo ""

sudo ssh -o StrictHostKeyChecking=no  -i $masterKops_Key_Loc ubuntu@$ipAddress -- "kops create cluster --name=kops.basic-dev-ops-site-trial.co --state=s3://basic-kops-state --zones=eu-north-1a --node-count=1 --node-size=t3.small --control-plane-zones=eu-north-1a --control-plane-size=t3.medium --dns-zone=kops.basic-dev-ops-site-trial.co --node-volume-size=8 --control-plane-volume-size=8"

if [[ $? != 0 ]]; then
 echo "Not able to initiate cluster"
 exit 1
fi

echo "Wait for 10 seconds to Start Cluster"
sleep 10

echo "--------------------------"
echo "Lets Start Cluster in Kops"
echo "--------------------------"

sudo ssh -o StrictHostKeyChecking=no  -i $masterKops_Key_Loc ubuntu@$ipAddress -- "kops update cluster --name kops.basic-dev-ops-site-trial.co --state=s3://basic-kops-state --yes --admin"


echo "-----------------------------"
echo "Wait for Approximatily 10 min"
echo "-----------------------------"



