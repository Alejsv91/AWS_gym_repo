import logging
import watchtower
import boto3
import os
from botocore.config import Config

AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
LOG_GROUP = os.getenv("LOG_GROUP", "my-backend-logs")
LOG_STREAM = os.getenv("LOG_STREAM", "fastapi")

boto3_client = boto3.client(
    "logs",
    region_name=AWS_REGION,
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    config=Config(retries={"max_attempts": 3})
)

logger = logging.getLogger("myapp")
logger.setLevel(logging.INFO)

cloudwatch_handler = watchtower.CloudWatchLogHandler(
    boto3_client=boto3_client,
    log_group=LOG_GROUP,
    stream_name=LOG_STREAM
)

logger.addHandler(cloudwatch_handler)
