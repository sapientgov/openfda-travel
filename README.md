Publicly-available URL to Prototype: [FDA Anywhere](http://fdaanywhere-fifteenfifteen.rhcloud.com)
Note: The application works across different  Internet browsers and device types. There are known issues with Internet Explorer relating to the login and search functionalities. Full functionality can be enjoyed in Chrome and Firefox.

# FDA Anywhere
Travel application for checking drug information using OpenFDA data.

[![Build Status](https://travis-ci.org/sapientgov/openfda-travel.svg?branch=master)](https://travis-ci.org/sapientgov/openfda-travel)
=============== 

##Table of Contents
  1. [Our Team](#our-team)
  1. [Our Approach](#our-approach)
  1. [Our Environment](#our-environment)
  1. [Alignment to the Digital Services Playbook](#alignment-to-the-digital-services-playbook)
  1. [Alignment to Criteria and Additional Evidence](#alignment-to-criteria-and-additional-evidence)
  1. [Dev Setup Instructions](#dev-setup-instructions)
  
##Our Team
For all engagements, including this hackathon, Sapient brings together our true experts, supported by a team of great people highly trained and skilled in their fields of expertise, ranging from overall user experience, design, and content, to front and backend development, agile delivery coaching, and testing. We used this approach for 18F, bringing together our lead experts and allocating them partially to this project, supported by additional people to make the vision come true. 

## Our Approach
In June 2015, a team of Sapient creative designers, information architects, business analysts, and software developers spent seven (more or less) long, intense days developing a service to help families, travelers, and the elderly better manage their medications. We wanted to provide a simple, accessible mobile experience to empower US citizens to make good medical decisions, whether at home or abroad, based on credible information. Most importantly, this experience needed to carry the full credibility and imprimatur of the FDA.

We ran this exercise using methods we've honed with commercial clients worldwide and consistent with the principles of the US Digital Services Playbook. Our 12-person team (Criteria B) (team members played multiple roles) co-located to two conference rooms for the duration of the project and conducted focus group and scenario tests of candidate ideas and concepts. We identified target audiences (ex. cancer survivor, chronic illness, mother of special-needs child) and worked our way through ideas, designs, and user experiences we felt represented meaningful value to citizens on the go (Criteria C, D, F).

Fueled by pizza and soda, our team went through boxes of whiteboard markers and reams of poster paper in the first two days alone. Technologists, creative designers, and site developers walked through each idea in depth, exploring possibilities and challenging one another to find undiscovered potential. Our release lead, Kirsten Rohde (Criteria A), kept the team on track, driving resolution of decisions when appropriate and dividing, combining, and shuffling sub-teams to ensure the working environment never went stale.

What we ultimately developed is the first release of an experience that advances the FDA's relevance as the authoritative source of relevant information on drugs. Like our team has done with NIH's [cancer.gov](http://www.cancer.gov/), we seek to extend the FDA's voice and message above the noise confronting internet users from other, less reputable sources.

We chose a JavaScript (Node.js) framework to maximize system flexibility, used familiar tools for tracking project progress (JIRA), continuous integration and deployment (Jasmine and Travis CI), interactive wireframing and user testing (Axure). We fought to maintain the one-room, one-conversation collaborative spirit we feel is necessary for true innovation. Discussions considered HIPAA and PII concerns, as well as future-looking requirements such as: translation, personalization around pre-existing individual conditions, additional data sources, and marketing and SEO considerations that extend the experience to the Google homepage.

Sapient developed an experience that hopefully demonstrates our potential to help 18F serve US citizens, making use of existing data and assets. We look forward to the opportunity to continue these efforts and conversations with you.

##Our Environment
Application code is hosted on GitHub. The JavaScript application is deployed to a Node.js and MongoDB based application architecture hosted on the platform-as-a-service provider, OpenShift (Criteria J).  The continuous integration service, Travis-CI, is used to build and deploy the code (Criteria L).  The build plan on Travis CI monitors the GitHub repository for code check-in to the master branch and automatically kicks off a build that includes running unit tests and deploying code to OpenShift.  Alternatively, a Docker container can be generated that will allow for deployment to another machine (Criteria O).  See [ServerSetup.txt](docs/ServerSetup.txt) in the github repository for more details.

## Alignment to the Digital Services Playbook
Below, we outline how our approach to meeting RFP requirements aligned to the [Digital Services Playbook](https://playbook.cio.gov/).

| **Play #** | **Sapient Response** |
| --------------- | -------------- |
| 1 | Our approach is anchored in audience analysis and understanding, to ensure what we create is useful and educational. We began by profiling target audience segments, looking to enhance the FDA brand with those customers we might best reach and help. |
| 2 | We focused on several user experiences, describing the path through which users might engage with the FDA brand to inform themselves and make better drug decisions. |
| 3 | Simple design is good design. |
| 4 | Sapient performed all tasks in a fully agile model, with multiple sprints. Each day began with a status call and ended with a live testing session, reviewing stories completed the previous day, followed by prioritization of the next day. |
| 5 | Sapient does this every day and will continue in compliance with GSA task orders. |
| 6 |  Kirsten Rohde was and remains the principal product owner for this release.  |
| 7 | Sapient is informed by 10+ years experience in agile development supporting hundreds of clients. |
| 8 | Sapient's technology stack leverages JavaScript, enabling evolution and improvement of the system. |
| 9 | We deployed the system using OpenShift, a Red Hat PaaS. |
| 10 | Sapient leveraged Jasmine and Travis CI for continuous integration and deployment. |
| 11 | By maintaining anonymous profiles we avoid the need to secure PII. |
| 12 | Sapient is experienced in leveraging analytics to improve reporting as well as drive personalization and optimization of the mobile experience. |
| 13 | Every component of our development solution leverages open source solutions, in accordance with Playbook principles. |

## Alignment to Criteria and Additional Evidence
- Documentation of our work process and introduction to our team: [7 Days and Then Some](https://medium.com/@Sapientgov/sapient-government-services-640e83187da1). 
- [Threat Modeling Report](docs/18f_threat_assessment.htm)
- Evidence of our alignment against all criteria: [Attachment E - Supplementary Evidence](docs/AttachmentE-SupplementaryEvidence.pdf). We provide a summary in the table below.

| **Criteria #** | **Evidence Summary** |
| --------------- | -------------- |
| A | Citation in Our Approach. |
| B | Citation in Our Approach. |
| C | Citation in in Our Approach. |
| D | Citation in in Our Approach. |
| E | [FDA Anywhere Style Guide](docs/styleguide-fda-anywhere.pdf). |
| F | We conducted usability testing through Axure with a group of five users external to the project team. |
| G | We clarified a broad understanding of the background, defined scope, identified high level requirements and high-level tech and creative design. We then used a Scrum-based Agile Framework for iterative development using consecutive Sprints as time-boundary definitions. Daily demo feedback was looped back into the process as either new defects or potential enhancements entered into the product backlog, prioritized and potentially carried over to the next Sprint. |
| H | [FDA Anywhere](http://fdaanywhere-fifteenfifteen.rhcloud.com). |
| I | We used multiple open-source technologies, including: Node.JS, Backbone.JS, mongoDB, Express, Compass, Grunt, Karma, Jasmine, and jQuery.
| J | Citation in Our Environment. |
| K | [GitHub repostitory](https://github.com/sapientgov/openfda-travel/tree/master/test). |
| L | Citation in Our Environment. |
| M | We used Git (github.com) to version control code.  Grunt, a JavaScript task runner, is used to automate the application build for multple environments. |
| N | We used Travis CI as our continuous monitoring tool. It detects changes to code in GitHub, compiles and runs unit tests via grunt scripts, and deploys to a serve on OpenShift. |
| O | Our solution has been setup for deployment with [Docker](https://www.docker.com/) which packages application with all of its dependencies into a standardized unit for software development. We have included a [Docker build file](Dockerfile) that will execute the build steps (running unit tests and ensuring all dependencies are available), and generates a VM with the deployed application that can be run in an independent virtual hosting environment.†|
| P | [Dev Setup Instructions](#dev-setup-instructions). |
| Q | The prototype architecture consists of only technologies freely available on the internet with variations of open source libraries. Source code is hosted on Github and is freely accessible. |

##Dev Setup Instructions
For some instructions, sudo privileges may be required on OSX and Linux.

1. Install Ruby (Windows only): http://rubyinstaller.com
1. Install Compass: `gem install compass` - May need sudo
1. Install NodeJS (v0.10.32+) & NPM: http://nodejs.org/download
1. Install Grunt: `npm install -g grunt-cli` - May need sudo
1. Install modules (Make sure youíre in working directory where package.json is available): `npm install` - May need sudo
1. Install MongoDB using the Installation instructions for your operating system at: https://docs.mongodb.org/manual/
1. Build & launch project using grunt: `grunt dev`