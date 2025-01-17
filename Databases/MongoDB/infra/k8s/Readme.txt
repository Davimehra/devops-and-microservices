volumeMount
/data/db

To run mongodb cluster with 3 replicaSet
kubectl apply -f ./

To set Primary and Secondary ReplicaSet
Read rs_initiate_Command

username: admin
password: password

To run mongoexpress server and expose its ip
cd mongoexpress
kubectl apply -f ./
minikube service mongoexpress-svc

username: admin
password: pass








Reference

https://phoenixnap.com/kb/kubernetes-mongodb

Making members primary
https://www.mongodb.com/docs/manual/tutorial/force-member-to-be-primary/
