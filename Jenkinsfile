def COLOR_MAP = ['SUCCESS': 'good', 'FAILURE': 'danger', 'UNSTABLE': 'danger', 'ABORTED': 'danger']

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
      label 'jenkins-app'
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
  - name: node
    image: node:latest
    command:
    - cat
    tty: true
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
    // stage('Test') {
    //   steps {
    //     container('node') {
    //       sh """
    //         npm install
    //         npm test
    //       """
    //     }
    //   }
    // }
    
    stage('Build and push image with Container Builder') {
      steps {
        container('gcloud') {
          sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${IMAGE_TAG} ."
        }
      }
    }
    
    stage('Deploy Production') {
      // Production branch
      when { branch 'master' }
      steps {
        container('kubectl') {
          sh("kubectl get ns backend")
          sh("sed -i.bak 's#gcr.io/gcr-project/sample:1.0.0#${IMAGE_TAG}#' ./k8s/staging/*.yaml")
          step([$class: 'KubernetesEngineBuilder',namespace:'staging', projectId: env.PROJECT, clusterName: env.CLUSTER, zone: env.CLUSTER_ZONE, manifestPattern: 'k8s/services', credentialsId: env.JENKINS_CRED, verifyDeployments: false])
          step([$class: 'KubernetesEngineBuilder',namespace:'staging', projectId: env.PROJECT, clusterName: env.CLUSTER, zone: env.CLUSTER_ZONE, manifestPattern: 'k8s/staging', credentialsId: env.JENKINS_CRED, verifyDeployments: true])
          //sh("echo http://`kubectl --namespace=staging get service/${FE_SVC_NAME} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${FE_SVC_NAME}")
        }
      }
    }

   // stage('Slack Feedback') {
    //  steps {
        //slackSend channel: "#internat",
         // color: COLOR_MAP[currentBuild.currentResult],
          //message: "*${currentBuild.currentResult}* \nJob: ${env.JOB_NAME} [Build ${env.BUILD_NUMBER}] \n${env.BUILD_URL}"
      //}
    //}
}
}
