node {
  def project = 'th-fnote'
  def appName = 'vfv'
  def nameSpace='staging'
  def cluster='standard-cluster-1'
  def region='us-central1-a'
  def feSvcName = "PROJECT-${appName}"
  def imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  checkout scm
  
  //stage 'Switch to appropriate cluster'
 // sh("gcloud config set compute/zone $region  && gcloud container clusters get-credentials $cluster")
  //sh("gcloud container clusters get-credentials jenkins-cd --zone us-east1-d --project srvc-marketplace")
  
  stage 'Build image'
  sh("docker build -t ${imageTag} .")

  stage 'Run node tests'
  //sh("docker run ${imageTag} node test")
  stage 'Skipping node tests'

  stage 'Push image to registry'
  sh("gcloud docker -- push ${imageTag}")

  stage "Deploy Application"
  switch (env.BRANCH_NAME) {
  // Roll out to canary environment
  case "canary":
      // Change deployed image in canary to the one we just built
      sh("sed -i.bak 's#gcr.io/${project}/${appName}:*#${imageTag}#' ./k8s/${nameSpace}/*.yaml")
      //sh("kubectl --namespace=${nameSpace} apply -f k8s/services/")
      sh("kubectl --namespace=${nameSpace} apply -f k8s/${nameSpace}/")
      break

  // Roll out to production
  case "master":
      // Change deployed image in canary to the one we just built
      sh("sed -i.bak 's#gcr.io/gcr-project/sample:1.0.0#${imageTag}#' ./k8s/${nameSpace}/*.yaml")
      sh("kubectl --namespace=${nameSpace} apply -f k8s/services/")
      sh("kubectl --namespace=${nameSpace} apply -f k8s/${nameSpace}/")
      break

    // Roll out a dev environment
    default:
        // Create namespace if it doesn't exist
        sh("kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}")
        // Don't use public load balancing for development branches
        sh("sed -i.bak 's#LoadBalancer#ClusterIP#' ./k8s/services/frontend.yaml")
        sh("sed -i.bak 's#gcr.io/${project}/${appName}:1.0.0#${imageTag}#' ./k8s/dev/*.yaml")
        sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/services/")
        sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/dev/")
        echo 'To access your environment run `kubectl proxy`'
        echo "Then access your service via http://localhost:8001/api/v1/proxy/namespaces/${env.BRANCH_NAME}/services/${feSvcName}:80/"
  }
}
