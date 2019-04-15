These are the only commands needed to run the project:

    # install yarn
    sudo apt-get update && sudo apt-get install yarn
    # update yarn
    yarn install
    # install webpacker:vue
    # DO NOT OVERWRITE. SELECT NO.
    bundle exec rails webpacker:install:vue

    # Migrate database
    rake db:migrate
    
    
After running 'vagrant ssh', run 'cd /vagrant' to get to the project folder.
Test data for uploads can be found in the 'testfiles/' folder from the main app path. (https://csil-git1.cs.surrey.sfu.ca/gurpaulg/470project/tree/master/testfiles)

Run 'foreman start' to host the website on the local host.