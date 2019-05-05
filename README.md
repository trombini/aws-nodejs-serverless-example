
# AWS Node Scheduled Cron Example to check website for string

This is an example of creating a function that runs as a cron job using the serverless `schedule` event. For more information on `schedule` event check out the Serverless docs on [schedule](https://serverless.com/framework/docs/providers/aws/events/schedule/).

Schedule events use the `rate` or `cron` syntax.

## Rate syntax

```pseudo
rate(value unit)
```

`value` - A positive number

`unit` - The unit of time. ( minute | minutes | hour | hours | day | days )

**Example** `rate(5 minutes)`

For more [information on the rate syntax see the AWS docs](http://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html#RateExpressions)

## Cron syntax

```pseudo
cron(Minutes Hours Day-of-month Month Day-of-week Year)
```

All fields are required and time zone is UTC only.

| Field         | Values         | Wildcards     |
| ------------- |:--------------:|:-------------:|
| Minutes       | 0-59           | , - * /       |
| Hours         | 0-23           | , - * /       |
| Day-of-month  | 1-31           | , - * ? / L W |
| Month         | 1-12 or JAN-DEC| , - * /       |
| Day-of-week   | 1-7 or SUN-SAT | , - * ? / L # |
| Year          | 192199      | , - * /       |

Read the [AWS cron expression syntax](http://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html) docs for more info on how to setup cron

## Test
```bash
REGEX='REGEX' URL='https://example.com' SENDGRID='APIKEY' node --inspect-brk test.js
```

## Deploy

In order to deploy the endpoint you simply run

```bash
serverless deploy
```

Result is something like this:
```bash
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (1.47 KB)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............
Serverless: Stack update finished...
Service Information
service: check-website-for-string
stage: dev
region: us-east-1
stack: check-website-for-string-dev
resources: 7
api keys:
  None
endpoints:
  None
functions:
  cron: check-website-for-string-dev-cron
layers:
  None
```

## Logs
**AWS CloudWatch Logs**
* [Open the Logs page of the CloudWatch console.](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)


**Serverless CLI**

To see your cron job running tail your logs with:

```bash
serverless logs --function cron --tail
```
