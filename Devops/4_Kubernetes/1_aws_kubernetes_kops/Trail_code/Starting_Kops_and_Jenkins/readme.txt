PreRequirements
1. Iam user AWS Account (ApiId,ApiKey) with 'Administration Previlages'
2. A new Instance, name=kops-admin
3. Route 53 with Hosted zone (using NameServer - ns) of your host domain name (like - kops)
   a. Create an hosted zone with Route53
   b. Copy all the NameServer Records to your domain site (godaddy) and paste over there with new NS Records hosted Domain name (kops) 
      eg ->  NS    kops    ns.aws.df12323
4. Login the kops-admin Instance


Steps to follow in Kops-admin Instance

Installing Updates
sudo apt update

Installing kubectl 
https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

Installing Kops
https://kubernetes.io/docs/setup/production-environment/tools/kops/

Installing awscli
$ sudo apt install awscli -y

Configure Aws
$ sudo aws configure

Installing sshKeys (for suppling the public key to all workerNodes while creating via Kops)
$ sudo ssh-kengen


DepreciatedCommand **** (using master instead of control-plane)
$ kops create cluster --name=kops.basic-dev-ops-site-trial.co --state=s3://basic-kops-state --zones=us-east-2a,us-east-2b --node-count=2 --node-size=t3.small --master-size=t3.medium --dns-zone=kops.basic-dev-ops-site-trial.co --node-volume-size=8 --master-volume-size=8


***** Creating cluster Command **** (Update for eu-north-1 ***Region)

$ kops create cluster --name=kops.basic-dev-ops-site-trial.co --state=s3://basic-kops-state --zones=eu-north-1a --node-count=1 --node-size=t3.small --control-plane-zones=eu-north-1a --control-plane-size=t3.medium --dns-zone=kops.basic-dev-ops-site-trial.co --node-volume-size=8 --control-plane-volume-size=8


****** Updating Cluster ****  (This command will trigger the creation of multiple services in aws )
$ kops update cluster --name kops.basic-dev-ops-site-trial.co --state=s3://basic-kops-state --yes --admin

****** Labeling nodes
$ kubectl label node <nodename> <labelname>=allow


****** Unlabeling nodes
$ kubectl label node <nodename> <labelname>-


****** Deleting Cluster  ****
$ kops delete cluster --name=kops.basic-dev-ops-site-trial.co --state=s3://basic-kops-state --yes






****** Validating Cluster ****  (This Command will validate the creation of cluster (master+workerNode))
$ kops validate cluster --state=s3://basic-kops-state --name=kops.basic-dev-ops-site-trial.co


Checkout ClusterConfiguration ***
Command
$ less .kube/config

Format of KubeConfig

apiVesion:v1
kind: Config
preferences: {}

clusters:
- name: kops.basic-dev-ops-site-trial.co
  cluster:
    certificate-authority-data: Certificate-data
    server: https://api.kops.basic-dev-ops-site-trial.co
    tls-server-name: api.internal.kops.basic-dev-ops-site-trial.co
    
users:
- name: kops.basic-dev-ops-site-trial.co
    user:
            client-certificate-data:
            client-key-data:

contexts:
  - name: kops.basic-dev-ops-site-trial.co
    context:
      cluster: kops.basic-dev-ops-site-trial.co
      user: kops.basic-dev-ops-site-trial.co
  
current-context: kops.basic-dev-ops-site-trial.co
  

********
Remember - klops can run more than one cluster
           so there must be proper state to save your cluster configuration, users who can access cluster, and contexts of configuration of 
           cluster and its user
           also 'current-context' will define the current active cluster handled by kubectl client 

**************************
users.user.client-key-data
this contain 'key' , which be used to authenticate the user
it is similar to the way we use ssh with the 


***************
current-context
 kubectl will use by default 'current-context' for 'cluster' name and the 'user' name through which it will login 

***********************
clusters.cluster.server
it contains url of 'API SERVER' which lives in 'MasterNode' at Control-plane
even check 'Route53' dashboard of your hostedDNS, 
you can se an SOP entry of 'api.domainName' which points to and IPAddress of MasterNode

**********
Conclusion - Kops create an environment of CLUSTER contianing 'Master' and 'WorkerNodes' (EC2 instances) with ( VPC,Route53 (DNS) Entries)
             to handle all the workerNodes we send request to 'API-Server' located in MasterNode,
             to send request to API-Server we need an well defined Client called kubectl







For Certification 

Either you can attach certificate at Application Load Balancer (in Aws)
Either you can attach certificate at Network Load Balancer



******** Ingress-Nginx-Controller ****************** (Installing)
https://kubernetes.github.io/ingress-nginx/deploy/#aws


************* TLS with Let's Encrypt ClusterIssuer ***********
https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes

OR


************* TLS with aws clusterIssuer *********************
https://aws.amazon.com/blogs/security/tls-enabled-kubernetes-clusters-with-acm-private-ca-and-amazon-eks-2/



****************** SSL using Let's Encrypt on kubernetes ****************
https://www.youtube.com/watch?v=KAa2l0oycOk        -- Git Http (https://github.com/saiyam1814/kube-certs/blob/main/deploy/deploy.yaml)

Let's Encrypt ProductionURL -- https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578


****************** Helm Install ************************
https://helm.sh/docs/intro/install/



****************** Cert-manager ************************
https://cert-manager.io/docs/installation/kubectl/



**********************************8--------------------------------------------------------
helm install --namespace test test-site helm/test-helm --set client_image=davimehra/test-client,server_image=davimehra/test-server


