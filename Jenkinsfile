pipeline {
  environment {
    PROJECT = "th-fnote"
    APP_NAME = "vfv"
    FE_SVC_NAME = "${APP_NAME}-frontend"
    CLUSTER = "standard-cluster-1"
    CLUSTER_ZONE = "us-central1-a"
    IMAGE_TAG = "gcr.io/${PROJECT}/${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
    JENKINS_CRED = "${PROJECT}"
  }
  agent {
    kubernetes {
      label 'vfv'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: cd-jenkins
  containers:
  #- name: golang
   # image: golang:1.10
#    command:
 #   - cat
  #  tty: true
  - name: gcloud
    image: gcr.io/cloud-builders/gcloud
    command:
    - cat
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat
    tty: true
"""
}
  }
  stages {
 
    
    stage('Build and push image with Container Builder') {
      steps {
        container('gcloud') {
          sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${IMAGE_TAG} ."
        }
      }
    }
//test    
    
 // stage('Deploy Canary') {
      // Canary branch
    //  when { branch 'canary' }
    //  steps {
      //  container('kubectl') {
          // Change deployed image in canary to the one we just built
        //  sh("sed -i.bak 's#gcr.io/th-genethagoswe/young_people_ask:1.0.0#${IMAGE_TAG}#' ./k8s/canary/*.yaml")
        //  step([$class: 'KubernetesEngineBuilder',namespace:'young-production', projectId: env.PROJECT, clusterName: env.CLUSTER, zone: env.CLUSTER_ZONE, manifestPattern: 'k8s/services', credentialsId: env.JENKINS_CRED, verifyDeployments: false])
         // step([$class: 'KubernetesEngineBuilder',namespace:'young-production', projectId: env.PROJECT, clusterName: env.CLUSTER, zone: env.CLUSTER_ZONE, manifestPattern: 'k8s/canary', credentialsId: env.JENKINS_CRED, verifyDeployments: true])
         // sh("echo http://`kubectl --namespace=production get service/${FE_SVC_NAME} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${FE_SVC_NAME}")
        //}
     // }
   // }
    
    stage('Deploy Production') {
      // Production branch
      when { branch 'master' }
      steps{
        container('kubectl') {
        // Change deployed image in canary to the one we just built
          sh("sed -i.bak 's#gcr.io/th-fnote/vfv:1.0.0#${IMAGE_TAG}#' ./k8s/staging/*.yaml")
          step([$class: 'KubernetesEngineBuilder',namespace:'staging', projectId: env.PROJECT, clusterName: env.CLUSTER, zone: env.CLUSTER_ZONE, manifestPattern: 'k8s/services', credentialsId: env.JENKINS_CRED, verifyDeployments: false])
          step([$class: 'KubernetesEngineBuilder',namespace:'staging', projectId: env.PROJECT, clusterName: env.CLUSTER, zone: env.CLUSTER_ZONE, manifestPattern: 'k8s/staging', credentialsId: env.JENKINS_CRED, verifyDeployments: true])
          sh("echo http://`kubectl --namespace=staging get service/${FE_SVC_NAME} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${FE_SVC_NAME}")
        }
      }
    }
//    
    //stage('Deploy Dev') {
      // Developer Branches
     // when {
     //   not { branch 'master' }
     //   not { branch 'canary' }
     // }
     // steps {
     //   container('kubectl') {
      //    // Create namespace if it doesn't exist
      //    sh("kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}")
      //    // Don't use public load balancing for development branches
      //    sh("sed -i.bak 's#LoadBalancer#ClusterIP#' ./k8s/services/frontend.yaml")
      //    sh("sed -i.bak 's#gcr.io/th-genethagoswe/young_people_ask:1.0.0#${IMAGE_TAG}#' ./k8s/dev/*.yaml")
      //    step([$class: 'KubernetesEngineBuilder',namespace: "${env.BRANCH_NAME}", projectId: env.PROJECT, clusterName: env.CLUSTER, zone: env.CLUSTER_ZONE, manifestPattern: 'k8s/services', credentialsId: env.JENKINS_CRED, verifyDeployments: false])
      //    step([$class: 'KubernetesEngineBuilder',namespace: "${env.BRANCH_NAME}", projectId: env.PROJECT, clusterName: env.CLUSTER, zone: env.CLUSTER_ZONE, manifestPattern: 'k8s/dev', credentialsId: env.JENKINS_CRED, verifyDeployments: true])
      //    echo 'To access your environment run `kubectl proxy`'
      //    echo "Then access your service via http://localhost:8001/api/v1/proxy/namespaces/${env.BRANCH_NAME}/services/${FE_SVC_NAME}:80/"
      //  }
     // }
   // }  
    stage('slack-Notfication'){
      when { branch 'master' }
      steps {
       slackSend baseUrl: '', 
       channel: 'vision_finding_village', 
       color: 'good', 
       message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n${env.BUILD_URL}", 
       teamDomain: 'gebeya.slack.com',
       tokenCredentialId: '6ce94421-934e-4000-8d8d-714d85898b39', 
       username: 'jenkins'
       }
       }
}
}
