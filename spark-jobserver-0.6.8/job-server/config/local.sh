# Environment and deploy file
# For use with bin/server_deploy, bin/server_package etc.
DEPLOY_HOSTS="bg-1
              bg-2
              bg-3"

APP_USER=root
APP_GROUP=root
# optional SSH Key to login to deploy server
#SSH_KEY=/path/to/keyfile.pem
INSTALL_DIR=/opt/jobserver-start
LOG_DIR=/var/log/job-server
PIDFILE=spark-jobserver.pid
JOBSERVER_MEMORY=1G
SPARK_VERSION=1.6.0-cdh5.8.3
MAX_DIRECT_MEMORY=1G
SPARK_HOME=/opt/cloudera/parcels/CDH-5.8.3-1.cdh5.8.3.p0.2/lib/spark
SPARK_CONF_DIR=$SPARK_HOME/conf
# Only needed for Mesos deploys
#SPARK_EXECUTOR_URI=/home/spark/spark-1.5.0.tar.gz
# Only needed for YARN running outside of the cluster
# You will need to COPY these files from your cluster to the remote machine
# Normally these are kept on the cluster in /etc/hadoop/conf
# YARN_CONF_DIR=/pathToRemoteConf/conf
#HADOOP_CONF_DIR=/etc/hive/conf
YARN_CONF_DIR=/opt/cloudera/parcels/CDH-5.8.3-1.cdh5.8.3.p0.2/lib/hadoop/etc/hadoop
HADOOP_CONF_DIR=/opt/cloudera/parcels/CDH-5.8.3-1.cdh5.8.3.p0.2/lib/hadoop/etc/hadoop
#
# Also optional: extra JVM args for spark-submit
# export SPARK_SUBMIT_OPTS+="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5433"
SCALA_VERSION=2.10.4 # or 2.11.6
