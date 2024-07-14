# install vps

sudo apt update -y && sudo apt install google-chrome-stable -y && sudo apt install docker.io -y && sudo apt install nodejs npm -y

# if issue

wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -

sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

sudo apt update

sudo apt install google-chrome-stable

# launch db
docker run --name my-postgres-db -e POSTGRES_USER=keepmesafe_user -e POSTGRES_PASSWORD=qsusdDSDekj3456d2YHg34Zp9su -e POSTGRES_DB=keepmesafe_db -p 5432:5432 -d postgres:latest


# launch app
nohup node /var/www/keep-me-safe/back-keep-me-safe/index.js &
