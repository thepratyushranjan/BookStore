# README #

__Backend commands__ 
==== 

### __1. Virtual environment__ 
```bash 
pip install virtualenv # install virtualenv 

virtualenv venv 

# windows 
`source venv/Scripts/activate` # activate virtual env 

# lniux 
source venv/bin/activate # activate virtual env 

pip install -r requirements.txt   #install all dependencies (listed in Pipfile) in virtual env 


py manage.py runserver  # to run command direct from virtual env 
``` 

### __2. Start Django server__ 
```bash 
migrate 
py manage.py runserver 
``` 

### __3. Migrations__ 
```bash 
source venv/bin/activate  
py manage.py makemigrations 
py mange.py migrate 
``` 

__Frontend commands__ 
====== 

### __1. React__ 
```bash 
yarn # install dependencies 

# start rect server 
yarn start # run react on seperate dev server (on port 3000, default only) | (for development only) 


 
``` 










