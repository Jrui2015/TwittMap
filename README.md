# TwittMap
Cloud Computing Course Project

## 1. Links
**The URL of Elastic Beanstalk**: http://twittmap-env.us-west-2.elasticbeanstalk.com/
**Github repo**: https://github.com/Jrui2015/TwittMap

## 2. How to use

(1) When open the website, the backend would keep collecting real-time tweets from Twitter Public Streaming API and generate a new red marker on the map. The tweets would be indexed to AWS Elastic Search at the same time.

(2) Click the marker to see the tweet content and user. You can then close the detail info panel.

(3) Use the keyword dropdown menu to select specific keyword. Then only the tweets that contain the keyword would be rendered on the map. The tweets are retrived from AWS Elastic Search so there would be a lot of tweets rendered.
