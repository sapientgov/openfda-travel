[Public URL to Sapient Prototype, FDA Anywhere](http://fdaanywhere-fifteenfifteen.rhcloud.com)

# openfda-travel
Travel application for checking drug information using OpenFDA data.

[![Build Status](https://travis-ci.org/sapientgov/openfda-travel.svg?branch=master)](https://travis-ci.org/sapientgov/openfda-travel)

=============== 
##Table of Contents
  1. [Our Approach](#our-approach)
  1. [Our Alignment to the digital Services Playbook](#our-alignment-to-the-digital-services-playbook)
  1. [Our Alignment to Full Stack Pool Criteria](#our-alignment-to-full-stack-pool-criteria)
  1. [Additional Evidence](#additional-evidence)
  1. [Dev Setup Intsructions](#dev-setup-instructions)
  
## Our Approach 
----------------------------------------------------
In June 2015, a team of Sapient creative designers, information architects, business analysts, and software developers spent seven (more or less) long, intense days developing a service to help families, travelers, and the elderly better manage their medications. We wanted to provide a simple, accessible mobile experience to empower US citizens to make good medical decisions, whether at home or abroad, based on credible information. Most importantly, this experience needed to carry the full credibility and imprimatur of the FDA.

We ran this exercise using methods we've honed with commercial clients worldwide and consistent with the principles of the US Digital Services Playbook. Our 12-person team (team members played multiple roles) co-located to two conference rooms for the duration of the project and conducted focus group and scenario tests of candidate ideas and concepts. We identified target audiences (ex. cancer survivor, chronic illness, mother of special-needs child) and worked our way through ideas, designs, and user experiences we felt represented meaningful value to citizens on the go.

Fueled by pizza and soda, our team went through boxes of whiteboard markers and reams of poster paper in the first two days alone. Technologists, creative designers, and site developers walked through each idea in depth, exploring possibilities and challenging one another to find undiscovered potential. Our release lead, Kirsten Rohde, kept the team on track, driving resolution of decisions when appropriate and dividing, combining, and shuffling sub-teams to ensure the working environment never went stale.

What we ultimately developed is the first release of an experience that advances the FDA's relevance as the authoritative source of relevant information on drugs. Like our team has done with NIH's [cancer.gov](http://www.cancer.gov/), we seek to extend the FDA's voice and message above the noise confronting internet users from other, less reputable sources.

We chose a JavaScript (Node.js) framework to maximize system flexibility, used familiar tools for tracking project progress (JIRA), continuous integration and deployment (Jasmine and Travis CI), interactive wireframing and user testing (Axure). We fought to maintain the one-room, one-conversation collaborative spirit we feel is necessary for true innovation. Discussions considered HIPAA and PII concerns, as well as future-looking requirements such as: translation, personalization around pre-existing individual conditions, additional data sources, and marketing and SEO considerations that extend the experience to the Google homepage.

Sapient developed an experience that hopefully demonstrates our potential to help 18F serve US citizens, making use of existing data and assets. We look forward to the opportunity to continue these efforts and conversations with you.

## Alignment to the Digital Services Playbook
----------------------------------------------------
Below, we outline how our approach to meeting RFP requirements aligned to the Digital Services Playbook:

```
        1. **Understand what the people need** ñ Our approach is anchored in audience analysis and understanding, to ensure what we create is useful and educational. We began by profiling target audience segments, looking to enhance the FDA brand with those customers we might best reach and help.
        2. **Address the whole experience, from start to finish**_ñ We focused on several user experiences, describing the path through which users might engage with the FDA brand to inform themselves and make better drug decisions.
        3. **Make it simple and intuitive** ñ Simple design is good design.
        4. **Build the service using agile and iterative practices** ñ Sapient performed all tasks in a fully agile model, with multiple sprints. Each day began with a status call and ended with a live testing session, reviewing stories completed the previous day, followed by prioritization of the next day.
        5. **Structure budgets and contracts to support delivery** ñ Sapient does this every day and will continue in compliance with GSA task orders.
        6. **Assign one leader and hold that person accountable** ñ Kirsten Rohde was and remains the principal product owner for this release. 
        7. **Bring in experienced teams** ñ Sapient is informed by 10+ years experience in agile development supporting hundreds of clients.
        8. **Choose a modern technology stack** ñ Sapientís technology stack leverages JavaScript, enabling evolution and improvement of the system.
        9. **Deploy in a flexible hosting environment** ñ We deployed the system using OpenShift, a Red Hat PaaS.
        10. **Automate testing and deployments** ñ Sapient leveraged Jasmine and Travis CI for continuous integration and deployment.
        11. **Manage security and privacy through reusable processes** ñBy maintaining anonymous profiles we avoid the need to secure PII.
        12. **Use data to drive decisions** ñ Sapient is experienced in leveraging analytics to improve reporting as well as drive personalization and optimization of the mobile experience.
        13. **Default to open**_ñ Every component of our development solution leverages open source solutions, in full compliance with Playbook principles.
```

## Alignment to Full Stack Pool Criteria
----------------------------------------------------
For evidence of our alignment to all Criteria for the Full Stack Pool, please refer to [Attachment E - Supplementary Evidence] (AttachESupplementaryEvidence.pdf). 

In the table below, we provide a brief summary narrative in response to the criteria for the Full Stack Pool.

```
| **Criteria #** | **Evidence Summary** |
| --------------- | -------------- |
| A | Kirsten Rohde served as our leader. Kirsten was responsible for managing track leads, dividing/combining/shuffling sub-teams, and ensuring the quality of our final prototype. |
| B | Our project team was composed of team members from all 13 of the Labor Categories required for Pool Three. This is reflected in Attachment C - Price Quote. |
| C | We involved non-project team members in the development and design process through focus groups and usability testing. |
| D | Our use of "human-centered design" techniques included: (1) user polling, (2) usability testing, and (3) daily demos. |
| E | A copy of our high-level style guide can be found in the repository: [FDA Anywhere Style Guide](styleguide-fda-anywhere.pdf). |
| F | We held usability testing with a group of five users external to the project team. The usability testing was done through Axure. |
| G | We initially clarified a broad understanding of the background, defined scope, identified high level requirements and high-level tech and creative design. We then used a Scrum-based Agile Framework for iterative development using consecutive Sprints as time-boundary definitions. Daily demo feedback was looped back into the process as either new defects or potential enhancements entered into the product backlog, prioritized and potentially carried over to the next Sprint. We used JIRA as our application lifecycle management (ALM) tool. We maintained a project and agile dashboard to track the increase in stories, test cases, and defects from sprint to sprint. |
| H | Our responsive prototype is available [FDA Anywhere](http://fdaanywhere-fifteenfifteen.rhcloud.com). |
| I | We used multiple open-source technologies, including: Node.JS, Backbone.JS, mongoDB, Express, Compass, Grunt, Karma, Jasmine, and jQuery.
| J | We utilized OpenShift (PaaS), as evidenced by our URL. OpenShift is a Red Hat PaaS.  |
| K | Our unit tests can be found in our github repostitory: https://github.com/sapientgov/openfda-travel/tree/master/test/. |
| L | We utilized Grunt (script runner that builds and executes unit tests locally) and Travis CI (build, execute unit tests, and deploys to server) as our continuos integration system. |
| M | Use of configuration management is demonstrated in the code. We used Git (github.com) to version control code.  Grunt, a JavaScript task runner, is used to automate the application build for multple environments. |
| N | We used Travis CI as our continuous monitoring tool. The Travis CI tool detects changes to code in github, compiles and runs unit tests via grunt scripts, and deploys to a serve on OpenShift. |
| O | CONTENT TBD |
| P | Our documentation is provided in the README file. |
| Q | The prototype architecture consists of only technologies freely available on the internet with variations of open source libraries. Source code is hosted on Github and is freely accessible. |
```

## Additional Evidence
----------------------------------------------------
- [FDA Anywhere Style Guide](styleguide-fda-anywhere.pdf)

#Dev Setup Instructions
For some instructions, sudo priveleges may be required on OSX and Linux.

1. Install Ruby (Windows only): http://rubyinstaller.com
1. Install Compass: `gem install compass` - May need sudo
1. Install NodeJS (v0.10.32+) & NPM: http://nodejs.org/download
1. Install Grunt: `npm install -g grunt-cli` - May need sudo
1. Install modules (Make sure you’re in working directory where package.json is available): `npm install` - May need sudo
1. Install MongoDB using the Installation instructions for your operating system at: https://docs.mongodb.org/manual/
1. Build & launch project using grunt: `grunt dev`