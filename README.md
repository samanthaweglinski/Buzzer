# Buzzer

Live Site: [Buzzer](https://buzzer-project.herokuapp.com/)

![splash-page](https://user-images.githubusercontent.com/32751992/189552680-bec8033f-b135-49df-bd93-8eadec31db8b.png)

Buzzer is a full-stack clone of [Twitter](https://twitter.com/). Users can view buzzes as well as send, edit, and delete their own. Users can also comment on other users buzzes.

## Languages, Frameworks, Platforms and Libraries

### Languages
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Backend
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=A90000) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Hosting
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Wiki Links:
* [Buzzer Wiki](https://github.com/samanthaweglinski/Buzzer/wiki)
* [Database Schema](https://github.com/samanthaweglinski/Buzzer/wiki/Database-Schema)
* [Features List](https://github.com/samanthaweglinski/Buzzer/wiki/MVP-Features)
* [User Stories](https://github.com/samanthaweglinski/Buzzer/wiki/User-Stories)

## Features
#### Login or Signup as a New User
![splash-page](https://user-images.githubusercontent.com/32751992/189552680-bec8033f-b135-49df-bd93-8eadec31db8b.png)

#### Create, Edit, and Delete a Buzz
![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/32751992/189553410-60bf4395-9191-466a-b34b-f1eb512d07be.gif)

#### View a Buzz's Comments
![Screen Shot 2022-09-11 at 4 20 07 PM](https://user-images.githubusercontent.com/32751992/189553238-2493dc99-58e6-444f-871f-10f846b32270.png)

#### Create, Edit, and Delete a Comment
![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/32751992/189553379-6d561399-643e-42c8-a237-865b2e04e3f3.gif)

## Steps to clone locally:
1. Clone this repository:
```bash
git clone https://github.com/samanthaweglinski/Buzzer.git
```

2. Install backend dependencies:

```bash
pipenv install -r requirements.txt
```

3. Create a `.env` file based on the example with proper settings for development environment:
```
SECRET_KEY=INSERT_SECRET_KEY_HERE
DATABASE_URL=sqlite:///dev.db
```

4. Start pipenv, migrate database, seed database, and run Flask app:

```bash
pipenv shell
flask db upgrade
flask seed all
flask run
```

5. Install frontend dependencies:

```bash
cd react-app/
npm install
npm start
```

6. Navigate to [localhost:3000](http://localhost:3000)


## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |
