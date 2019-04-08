var mongoose = require("mongoose");
Match = mongoose.model("Match");
Role = mongoose.model("Role");
User = mongoose.model("User");

let match_seed = [
    {
        _id: 1,
        users: [1, 2],
        chatLines: [
            {
                userId: 1,
                message: "Hey ik ben Max"
            }, {
                userId: 2,
                message: "Jo ik ben Thomas!"
            }
        ]
    },{
        _id: 2,
        users: [1, 4],
        chatLines: [
            {
                userId: 1,
                message: "Hey ik ben Max"
            }, {
                userId: 4,
                message: "Jo ik ben Martijn!"
            }, {
                userId: 4,
                message: "Ga je nog reageren?"
            }
        ]
    },{
        _id: 3,
        users: [5, 6],
        chatLines: [
            {
                userId: 6,
                message: "BEEEP BEEP BOOOOOOP"
            }, {
                userId: 5,
                message: "w"
            }, {
                userId: 5,
                message: "t"
            }, {
                userId: 5,
                message: "f"
            }
        ]
    }

];

let role_seed = [
    {
        name: "admin"
    },
    {
        name: "user"
    }
];



let user_seed = [
    {
        "_id": 0,
        "firstName": "admin",
        "lastName": "admin",
        "email": "admin@admin.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Emtrac",
        "studyYear": 6,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "admin"
        ]
    },
    {
        "_id": 1,
        "firstName": "Valentine",
        "lastName": "Williamson",
        "email": "user@user.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Idetica",
        "studyYear": 2,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 2,
        "firstName": "Dolly",
        "lastName": "Mayo",
        "email": "dollymayo@idetica.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Zillatide",
        "studyYear": 4,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 3,
        "firstName": "Figueroa",
        "lastName": "Browning",
        "email": "figueroabrowning@zillatide.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Helixo",
        "studyYear": 3,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 4,
        "firstName": "Carey",
        "lastName": "Whitley",
        "email": "careywhitley@helixo.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Netility",
        "studyYear": 3,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 5,
        "firstName": "Lea",
        "lastName": "Hebert",
        "email": "leahebert@netility.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Blanet",
        "studyYear": 5,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 6,
        "firstName": "Victoria",
        "lastName": "Aguilar",
        "email": "victoriaaguilar@blanet.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Quordate",
        "studyYear": 3,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 7,
        "firstName": "Freida",
        "lastName": "Knight",
        "email": "freidaknight@quordate.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Architax",
        "studyYear": 4,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 8,
        "firstName": "Cathleen",
        "lastName": "Herman",
        "email": "cathleenherman@architax.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Gynko",
        "studyYear": 4,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 9,
        "firstName": "Horne",
        "lastName": "Kline",
        "email": "hornekline@gynko.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Tingles",
        "studyYear": 6,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 10,
        "firstName": "Lourdes",
        "lastName": "Benjamin",
        "email": "lourdesbenjamin@tingles.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Vurbo",
        "studyYear": 2,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 11,
        "firstName": "Katina",
        "lastName": "Lewis",
        "email": "katinalewis@vurbo.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Qimonk",
        "studyYear": 1,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 12,
        "firstName": "Tami",
        "lastName": "Craig",
        "email": "tamicraig@qimonk.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Fangold",
        "studyYear": 3,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 13,
        "firstName": "Riddle",
        "lastName": "Walsh",
        "email": "riddlewalsh@fangold.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Zappix",
        "studyYear": 1,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 14,
        "firstName": "Harding",
        "lastName": "Rodgers",
        "email": "hardingrodgers@zappix.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Xplor",
        "studyYear": 2,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 15,
        "firstName": "Terry",
        "lastName": "Durham",
        "email": "terrydurham@xplor.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Ziore",
        "studyYear": 4,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 16,
        "firstName": "Tran",
        "lastName": "Horne",
        "email": "tranhorne@ziore.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Comverges",
        "studyYear": 1,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 17,
        "firstName": "Foster",
        "lastName": "Abbott",
        "email": "fosterabbott@comverges.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Comstar",
        "studyYear": 3,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 18,
        "firstName": "Herminia",
        "lastName": "Griffith",
        "email": "herminiagriffith@comstar.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Zoarere",
        "studyYear": 2,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 19,
        "firstName": "Leonor",
        "lastName": "Carrillo",
        "email": "leonorcarrillo@zoarere.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Martgo",
        "studyYear": 5,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 20,
        "firstName": "Rosetta",
        "lastName": "Langley",
        "email": "rosettalangley@martgo.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Zolavo",
        "studyYear": 2,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 21,
        "firstName": "Ernestine",
        "lastName": "Oneil",
        "email": "ernestineoneil@zolavo.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Talendula",
        "studyYear": 5,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 22,
        "firstName": "Hebert",
        "lastName": "Calhoun",
        "email": "hebertcalhoun@talendula.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Furnitech",
        "studyYear": 2,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 23,
        "firstName": "Wilder",
        "lastName": "Cole",
        "email": "wildercole@furnitech.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Gology",
        "studyYear": 3,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 24,
        "firstName": "Shields",
        "lastName": "Wiggins",
        "email": "shieldswiggins@gology.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Xinware",
        "studyYear": 2,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 25,
        "firstName": "Pena",
        "lastName": "Frank",
        "email": "penafrank@xinware.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Isopop",
        "studyYear": 2,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 26,
        "firstName": "Mia",
        "lastName": "Mathis",
        "email": "miamathis@isopop.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Prowaste",
        "studyYear": 2,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 27,
        "firstName": "Connie",
        "lastName": "Porter",
        "email": "connieporter@prowaste.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Filodyne",
        "studyYear": 3,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 28,
        "firstName": "Lindsay",
        "lastName": "Atkinson",
        "email": "lindsayatkinson@filodyne.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Naxdis",
        "studyYear": 5,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    },
    {
        "_id": 29,
        "firstName": "Clements",
        "lastName": "Harrell",
        "email": "clementsharrell@naxdis.com",
        "password": "test123",
        "profilePicture": "https://pm1.narvii.com/6816/77a7cb3f46f8a54915890977e1dad58d2f907b60v2_hq.jpg",
        "birthDate": "1998-09-07",
        "study": "Cyclonica",
        "studyYear": 6,
        "matches": [],
        "likes": [
            0
        ],
        "dislikes": [],
        "roles": [
            "user"
        ]
    }
]



// Fill users testdata if the user table is empty
module.exports = function(){
    let Match = mongoose.model('Match');
    let Role = mongoose.model('Role');
    let User = mongoose.model('User');
    let test = false;

    if (test == false) {
        // Filling matches
        Match.deleteMany({}).then(function () {
            Match.find({}).then(match => {
                if (!match.length) {
                    console.log('\tNo matches found, filling testdata');
                    Match.insertMany(match_seed)
                        .then(() => console.log('\tFilling match testdata succesfull'))
                        .catch(err => console.log('\tFilling match testdata failed', err));
                }
            });
        });

        // filling roles
        Role.deleteMany({}).then(function () {
            Role.find({}).then(roles => {
                if (!roles.length) {
                    console.log('\tNo roles found, filling testdata');

                    Role.insertMany(role_seed)
                        .then(() => console.log('\tFilling roles testdata succesfull'))
                        .catch(err => console.log('\tFilling roles testdata failed', err));

                }
            });
        });

        // filling users
        User.deleteMany({}).then(function () {
            User.find({}).then(users => {
                if (!users.length) {
                    console.log('\tNo users found, filling testdata');

                    User.insertMany(user_seed)
                        .then(() => console.log('\tFilling user testdata succesfull'))
                        .catch(err => console.log('\tFilling user testdata failed', err));

                }
            });
        });
    }
        
}
