#!/bin/bash

choice=-1
workDir="/dependencies"
echo "------------------------------------------------------"
echo "Press 1 - start       - Jenkins     - Instance"
echo "Press 2 - start       - Kops        - Instance"
echo ""
echo "Press 3 - IpAddress   - Jenkins     - Instance "
echo "Press 4 - IpAddress   - Kops        - Instance "
echo ""
echo "Press 5 - stop        - Jenkins      - Instance"
echo "Press 6 - stop        - Kops Master  - Instance"
echo ""
echo "Press 7 - Initialize  - Kubernetes Cluster using kops"
echo "Press 8 - Delete      - Kubernetes Cluster using kops"
echo ""
echo "******************************************************"
echo "Press 9  - START  Cluster and INITIALIZE Kops Instance"
echo "Press 10 - Delete Cluster and STOP       Kops Instance"
echo "******************************************************"
echo ""
echo "Press 11 - All - IpAddress"
echo ""
echo "Press 0 - exit "
echo "-----------------------------------------------------"
read -p "Enter Your Choice = " choice

echo ""

cd .$workDir

if [[ $? == 1 ]]; then
 echo "dependencies directory does'nt exists"
 exit 1
else
  echo "Changed working dir to ./dependencies"
fi

case $choice in
 1)
	 echo ""
  echo -n "** Starting Script Jenkins Startup **"
  echo ""
  sleep 1
  ./Jenkins_Startup.sh
  ./findIp.sh -e Jenkins
  
  echo ""
  cd ..
  sudo ./run.sh
  ;;
  
 2)
	 echo ""
  echo -n "** Starting Script Kops-Master Startup **"
  echo ""
  sleep 1
  ./KopsMaster_Startup.sh
  ./findIp.sh -e Kops.*Master
  echo ""
  cd ..
  sudo ./run.sh
  ;;

 3)
	
  echo ""
  echo -n "** Starting Script - findIp [Options] -e Jenkins  **"
  echo ""
  echo -n "Jenkins Ip Address : "
  ./findIp.sh -e Jenkins
  echo ""

  cd ..
  sudo /run.sh
  ;;

  4)
  echo ""
  echo -n "** Starting Script - findIp [Options] -e Kops.*Master  **"
  echo ""
  sleep 1
  ./findIp.sh -e Kops.*Master
  echo ""
  cd ..
  sudo ./run.sh
  ;;


  5)
	  echo ""
  echo -n "** Stop Script Jenkins Startup **"
  echo ""
  sleep 1
  ./Jenkins_Startup.sh 'stop'
  echo ""
  cd ..
  sudo ./run.sh
  ;;

 6)
	 echo ""
  echo -n "** Stop Script Kops-Master Startup **"
  echo ""
  sleep 1
  ./KopsMaster_Startup.sh 'stop'
  echo ""
  cd ..
  sudo ./run.sh
  ;;

  7)
  echo ""
  echo -n "** Initializing Cluster Script **"
  echo ""
  sleep 1
  ./initializingCluster.sh
   echo ""
  cd ..
  sudo ./run.sh
  ;;

  8)
  echo ""
  echo -n "** Initializing  Cluster Script with 'delete' arg **"
  echo ""
  sleep 1
  ./initializingCluster.sh 'delete'
  echo ""
  cd ..
  sudo ./run.sh
  ;;


9)
  echo ""
  echo -n "** Starting Script Kops-Master Startup **"
  echo ""
  sleep 1
  ./KopsMaster_Startup.sh
  ./findIp.sh -e Kops.*Master
  echo "" 
  echo "Waiting for approximatly 3 min to start Kops Instance"
  sleep 180

  echo ""
  echo -n "** Initializing Cluster Script **"
  echo ""
  sleep 1
  ./initializingCluster.sh
  echo ""
  
  cd ..
  sudo ./run.sh

  ;;


10)
 
  echo "Deleting Cluster First"
  echo -n "** Initializing Cluster Script **"
  echo ""
  sleep 1
  ./initializingCluster.sh 'delete'
  echo ""
  echo "Waiting 10 sec "
  
  sleep 10

  echo ""
  echo "** Stoping Kops-Master Instance **"
  echo ""
  sleep 1
  ./KopsMaster_Startup.sh 'stop'
  echo ""
  cd ..
  sudo ./run.sh

  ;;

11)
 echo "Getting All Running Instance IpAddresses"
 ./findIp.sh
 ;;

  0)
  echo ""
  echo -n "** Ending Script **"
  echo ""
  exit 0
  ;;
 
 *)
  echo "Enter Correct Choice again"
  cd ..
  sudo ./run.sh
  ;;

esac
