/**
 * NED University of Engineering & Technology — Georeferenced Satellite & Master Plan Dataset
 * Calibrated via OpenStreetMap satellite ground-truth landmarks + 2D Affine Transformation.
 */
window.NED_CAMPUS_DATA = {
  "meta": {
    "name": "NED University of Engineering & Technology",
    "shortName": "NED Main Campus",
    "city": "Karachi, Pakistan",
    "center": [
      24.9322,
      67.1133
    ],
    "defaultZoom": 17,
    "minZoom": 15,
    "maxZoom": 20,
    "maxBounds": [
      [
        24.9265,
        67.105
      ],
      [
        24.9385,
        67.1205
      ]
    ],
    "masterPlanControlCorners": {
      "topLeft": [
        24.93788,
        67.11341
      ],
      "topRight": [
        24.93076,
        67.11837
      ],
      "bottomLeft": [
        24.93389,
        67.10644
      ],
      "bottomRight": [
        24.92677,
        67.11141
      ]
    },
    "campusBoundaryPolygon": [
      [
        24.93689,
        67.11254
      ],
      [
        24.93113,
        67.11763
      ],
      [
        24.92861,
        67.11324
      ],
      [
        24.93453,
        67.10843
      ]
    ],
    "soccerPolygon": [
      [
        24.9323,
        67.11682
      ],
      [
        24.93116,
        67.11762
      ],
      [
        24.93076,
        67.11692
      ],
      [
        24.9319,
        67.11612
      ]
    ],
    "parkingPolygon": [
      [
        24.93133,
        67.11537
      ],
      [
        24.93093,
        67.11564
      ],
      [
        24.93075,
        67.11533
      ],
      [
        24.93115,
        67.11506
      ]
    ],
    "walkingSpeedMps": 1.3
  },
  "landmarks": [
    {
      "id": "poi-1",
      "blockNumber": "1",
      "name": "Banks (National Bank of Pakistan & Campus Banking)",
      "shortName": "Banks (NBP)",
      "category": "Services",
      "major": true,
      "coordinates": [
        24.93013,
        67.11519
      ],
      "entrance_coords": [
        24.9303,
        67.11548
      ],
      "footprintPolygon": [
        [
          24.93029,
          67.1152
        ],
        [
          24.93007,
          67.11536
        ],
        [
          24.92997,
          67.11518
        ],
        [
          24.93019,
          67.11502
        ]
      ],
      "nearestNode": "n_gate_north_inner",
      "keywords": [
        "bank",
        "nbp",
        "atm",
        "fee",
        "challan",
        "finance",
        "1"
      ],
      "buildingHours": "09:00 AM – 04:00 PM",
      "floorCount": 1,
      "description": "National Bank of Pakistan (NED Branch) and ATM facility near the North-East University Road entrance."
    },
    {
      "id": "poi-2",
      "blockNumber": "2",
      "name": "Video Conferencing Facility",
      "shortName": "Video Conferencing",
      "category": "Services",
      "major": true,
      "coordinates": [
        24.93073,
        67.11313
      ],
      "entrance_coords": [
        24.93088,
        67.11302
      ],
      "footprintPolygon": [
        [
          24.93087,
          67.11315
        ],
        [
          24.93069,
          67.11328
        ],
        [
          24.93059,
          67.11311
        ],
        [
          24.93077,
          67.11298
        ]
      ],
      "nearestNode": "n_east_acad_south",
      "keywords": [
        "video",
        "conferencing",
        "seminar",
        "lecture",
        "digital",
        "2"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Dedicated digital conferencing and remote seminar hall adjacent to the CSIT cluster."
    },
    {
      "id": "poi-3",
      "blockNumber": "3",
      "name": "Department of Urban & Infrastructure Engineering",
      "shortName": "Urban Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93101,
        67.11268
      ],
      "entrance_coords": [
        24.93109,
        67.11273
      ],
      "footprintPolygon": [
        [
          24.93127,
          67.11265
        ],
        [
          24.93088,
          67.11293
        ],
        [
          24.93075,
          67.11271
        ],
        [
          24.93114,
          67.11243
        ]
      ],
      "nearestNode": "n_civil_south",
      "keywords": [
        "urban",
        "infrastructure",
        "town planning",
        "civil",
        "3"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Department of Urban and Infrastructure Engineering at the southern wing of the Civil Engineering complex."
    },
    {
      "id": "poi-4",
      "blockNumber": "4",
      "name": "Civil Engineering Dept. (Blocks 4, 4A, 4B)",
      "shortName": "Civil Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93116,
        67.11293
      ],
      "entrance_coords": [
        24.93154,
        67.11295
      ],
      "footprintPolygon": [
        [
          24.93147,
          67.11297
        ],
        [
          24.93106,
          67.11326
        ],
        [
          24.93085,
          67.11289
        ],
        [
          24.93126,
          67.1126
        ]
      ],
      "nearestNode": "n_civil_mid",
      "keywords": [
        "civil",
        "ced",
        "structures",
        "hydraulics",
        "surveying",
        "4",
        "4a",
        "4b"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 3,
      "description": "Main Civil Engineering Department housing classrooms, faculty offices, CED Labs (4A), and Material Testing Lab (4B)."
    },
    {
      "id": "poi-4a",
      "blockNumber": "4A",
      "name": "Labs of Civil Engineering Dept. (Survey & CED Labs)",
      "shortName": "CED Labs (4A)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.93168,
        67.11362
      ],
      "entrance_coords": [
        24.93184,
        67.11348
      ],
      "footprintPolygon": [
        [
          24.93194,
          67.11362
        ],
        [
          24.93157,
          67.11388
        ],
        [
          24.93142,
          67.11362
        ],
        [
          24.93179,
          67.11336
        ]
      ],
      "nearestNode": "n_civil_north",
      "keywords": [
        "civil labs",
        "ced",
        "survey lab",
        "concrete",
        "soil",
        "geotech",
        "4a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Survey Lab, Geotechnical, Concrete, and Transportation Engineering laboratories."
    },
    {
      "id": "poi-4b",
      "blockNumber": "4B",
      "name": "Advanced Material Testing Lab",
      "shortName": "Material Lab (4B)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.93086,
        67.11341
      ],
      "entrance_coords": [
        24.93105,
        67.11328
      ],
      "footprintPolygon": [
        [
          24.93107,
          67.11339
        ],
        [
          24.93076,
          67.11361
        ],
        [
          24.93065,
          67.11343
        ],
        [
          24.93096,
          67.11321
        ]
      ],
      "nearestNode": "n_csit_south",
      "keywords": [
        "material testing",
        "structural lab",
        "civil",
        "4b"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 1,
      "description": "High-capacity structural and material testing laboratory adjacent to CSIT and Civil Engineering."
    },
    {
      "id": "poi-5",
      "blockNumber": "5",
      "name": "Depts. of Comp. Sc. & I.T and Maths & Basic Sciences",
      "shortName": "CSIT & Maths",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93107,
        67.1139
      ],
      "entrance_coords": [
        24.93121,
        67.11356
      ],
      "footprintPolygon": [
        [
          24.93131,
          67.11391
        ],
        [
          24.93097,
          67.11414
        ],
        [
          24.93083,
          67.11389
        ],
        [
          24.93117,
          67.11366
        ]
      ],
      "nearestNode": "n_csit_mid",
      "keywords": [
        "cs",
        "csit",
        "computer science",
        "it",
        "information technology",
        "mathematics",
        "basic sciences",
        "software",
        "5"
      ],
      "buildingHours": "08:30 AM – 05:00 PM",
      "floorCount": 3,
      "description": "Department of Computer Science & Information Technology and Department of Mathematics & Basic Sciences."
    },
    {
      "id": "poi-5a",
      "blockNumber": "5A",
      "name": "Labs of CSIT Dept. & Maths & Basic Sciences",
      "shortName": "CSIT Labs (5A)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.93123,
        67.11419
      ],
      "entrance_coords": [
        24.93145,
        67.11397
      ],
      "footprintPolygon": [
        [
          24.93148,
          67.1142
        ],
        [
          24.93113,
          67.11444
        ],
        [
          24.93098,
          67.11418
        ],
        [
          24.93133,
          67.11394
        ]
      ],
      "nearestNode": "n_csit_north",
      "keywords": [
        "csit labs",
        "computer lab",
        "programming",
        "ai lab",
        "networking",
        "5a"
      ],
      "buildingHours": "08:30 AM – 05:00 PM",
      "floorCount": 3,
      "description": "Computing, software engineering, networking, and applied mathematics laboratories."
    },
    {
      "id": "poi-6",
      "blockNumber": "6",
      "name": "Courtyard Fountain",
      "shortName": "Courtyard Fountain",
      "category": "Landmark",
      "major": true,
      "coordinates": [
        24.93182,
        67.11278
      ],
      "entrance_coords": [
        24.93182,
        67.11278
      ],
      "footprintPolygon": [
        [
          24.93193,
          67.1128
        ],
        [
          24.93179,
          67.1129
        ],
        [
          24.93171,
          67.11276
        ],
        [
          24.93185,
          67.11266
        ]
      ],
      "nearestNode": "n_fountain",
      "keywords": [
        "fountain",
        "courtyard",
        "central",
        "meeting point",
        "landmark",
        "6"
      ],
      "buildingHours": "Open 24 Hours",
      "floorCount": 1,
      "description": "Central courtyard fountain connecting the Auditorium, IT Department, and Civil Engineering plaza."
    },
    {
      "id": "poi-7",
      "blockNumber": "7",
      "name": "Girls Common Room",
      "shortName": "Girls Common Room",
      "category": "Services",
      "major": true,
      "coordinates": [
        24.93195,
        67.11315
      ],
      "entrance_coords": [
        24.93194,
        67.11299
      ],
      "footprintPolygon": [
        [
          24.93214,
          67.11314
        ],
        [
          24.93186,
          67.11334
        ],
        [
          24.93176,
          67.11316
        ],
        [
          24.93204,
          67.11296
        ]
      ],
      "nearestNode": "n_fountain_north",
      "keywords": [
        "girls common room",
        "gcr",
        "lounge",
        "female",
        "student lounge",
        "7"
      ],
      "buildingHours": "08:00 AM – 04:30 PM",
      "floorCount": 1,
      "description": "Dedicated student lounge and rest area for female students adjacent to the Courtyard Fountain."
    },
    {
      "id": "poi-8",
      "blockNumber": "8",
      "name": "IT Dept. / PVC (Dev.) Office",
      "shortName": "IT / PVC Office",
      "category": "Administration",
      "major": true,
      "coordinates": [
        24.93162,
        67.11231
      ],
      "entrance_coords": [
        24.93166,
        67.11243
      ],
      "footprintPolygon": [
        [
          24.9318,
          67.1123
        ],
        [
          24.93154,
          67.11248
        ],
        [
          24.93144,
          67.11232
        ],
        [
          24.9317,
          67.11214
        ]
      ],
      "nearestNode": "n_fountain_south",
      "keywords": [
        "it",
        "pvc",
        "pro vice chancellor",
        "development",
        "network",
        "server",
        "8"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Information Technology Directorate and Office of the Pro-Vice Chancellor (Development)."
    },
    {
      "id": "poi-9",
      "blockNumber": "9",
      "name": "IT Dept. / Audio Visual Centre",
      "shortName": "Audio Visual (IT)",
      "category": "Services",
      "major": false,
      "coordinates": [
        24.93171,
        67.11252
      ],
      "entrance_coords": [
        24.93175,
        67.11262
      ],
      "footprintPolygon": [
        [
          24.93188,
          67.11251
        ],
        [
          24.93163,
          67.11269
        ],
        [
          24.93154,
          67.11253
        ],
        [
          24.93179,
          67.11235
        ]
      ],
      "nearestNode": "n_fountain_south",
      "keywords": [
        "audio visual",
        "av",
        "media",
        "it services",
        "multimedia",
        "9"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Campus Audio-Visual production, smart classroom support, and IT systems unit."
    },
    {
      "id": "poi-10",
      "blockNumber": "10",
      "name": "Staff Centre",
      "shortName": "Staff Centre",
      "category": "Services",
      "major": true,
      "coordinates": [
        24.93143,
        67.1122
      ],
      "entrance_coords": [
        24.93149,
        67.11226
      ],
      "footprintPolygon": [
        [
          24.93157,
          67.11221
        ],
        [
          24.93137,
          67.11235
        ],
        [
          24.93129,
          67.11219
        ],
        [
          24.93149,
          67.11205
        ]
      ],
      "nearestNode": "n_staff_centre",
      "keywords": [
        "staff",
        "faculty club",
        "lounge",
        "teachers",
        "10"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 1,
      "description": "Faculty and staff dining and common room adjacent to the central IT cluster."
    },
    {
      "id": "poi-11",
      "blockNumber": "11",
      "name": "Main Auditorium",
      "shortName": "Auditorium",
      "category": "Services",
      "major": true,
      "coordinates": [
        24.9321,
        67.11257
      ],
      "entrance_coords": [
        24.93195,
        67.11267
      ],
      "footprintPolygon": [
        [
          24.93229,
          67.11258
        ],
        [
          24.93203,
          67.11276
        ],
        [
          24.93191,
          67.11256
        ],
        [
          24.93217,
          67.11238
        ]
      ],
      "nearestNode": "n_fountain",
      "keywords": [
        "auditorium",
        "convocation",
        "main hall",
        "events",
        "conference",
        "11"
      ],
      "buildingHours": "08:30 AM – 06:00 PM",
      "floorCount": 2,
      "description": "NED University's flagship auditorium hosting convocations, keynotes, and national engineering symposia."
    },
    {
      "id": "poi-12",
      "blockNumber": "12",
      "name": "Mechanical Engineering Dept. & Labs (12, 12A)",
      "shortName": "Mechanical Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93204,
        67.11183
      ],
      "entrance_coords": [
        24.9319,
        67.11193
      ],
      "footprintPolygon": [
        [
          24.93232,
          67.11182
        ],
        [
          24.93192,
          67.1121
        ],
        [
          24.93176,
          67.11184
        ],
        [
          24.93216,
          67.11156
        ]
      ],
      "nearestNode": "n_mech_south",
      "keywords": [
        "mechanical",
        "med",
        "thermo",
        "fluid",
        "workshop",
        "robotics",
        "12",
        "12a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 3,
      "description": "Department of Mechanical Engineering spanning multiple wings for classrooms, workshops, and MED Labs (12A)."
    },
    {
      "id": "poi-12a",
      "blockNumber": "12A",
      "name": "Mechanical Engineering Labs (MED Labs)",
      "shortName": "MED Labs (12A)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.93267,
        67.11293
      ],
      "entrance_coords": [
        24.93253,
        67.11303
      ],
      "footprintPolygon": [
        [
          24.93294,
          67.11292
        ],
        [
          24.93254,
          67.11319
        ],
        [
          24.9324,
          67.11294
        ],
        [
          24.9328,
          67.11267
        ]
      ],
      "nearestNode": "n_mech_north",
      "keywords": [
        "med labs",
        "mechanical labs",
        "heat transfer",
        "hvac",
        "ic engine",
        "12a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Thermodynamics, Internal Combustion Engines, Fluid Mechanics, and Manufacturing workshops."
    },
    {
      "id": "poi-13",
      "blockNumber": "13",
      "name": "Electrical Engineering Dept. & Labs (13, 13A)",
      "shortName": "Electrical Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93222,
        67.11214
      ],
      "entrance_coords": [
        24.93208,
        67.11224
      ],
      "footprintPolygon": [
        [
          24.93247,
          67.11211
        ],
        [
          24.93209,
          67.11238
        ],
        [
          24.93197,
          67.11217
        ],
        [
          24.93235,
          67.1119
        ]
      ],
      "nearestNode": "n_elec_mid",
      "keywords": [
        "electrical",
        "eed",
        "power",
        "high voltage",
        "machines",
        "control",
        "13",
        "13a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 3,
      "description": "Department of Electrical Engineering featuring lecture theaters, power system simulators, and EED Labs (13A)."
    },
    {
      "id": "poi-13a",
      "blockNumber": "13A",
      "name": "Electrical Engineering Labs (EED Labs)",
      "shortName": "EED Labs (13A)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.93249,
        67.11261
      ],
      "entrance_coords": [
        24.93235,
        67.11271
      ],
      "footprintPolygon": [
        [
          24.93274,
          67.11258
        ],
        [
          24.93236,
          67.11285
        ],
        [
          24.93224,
          67.11264
        ],
        [
          24.93262,
          67.11237
        ]
      ],
      "nearestNode": "n_elec_north",
      "keywords": [
        "eed labs",
        "electrical labs",
        "machines lab",
        "power electronics",
        "13a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Electrical Machines, High Voltage, Instrumentation, and Power Systems laboratories."
    },
    {
      "id": "poi-14",
      "blockNumber": "14",
      "name": "Industrial & Manufacturing Engg. Dept. (14, 14A)",
      "shortName": "Industrial Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93356,
        67.11169
      ],
      "entrance_coords": [
        24.93335,
        67.11184
      ],
      "footprintPolygon": [
        [
          24.9338,
          67.11168
        ],
        [
          24.93345,
          67.11193
        ],
        [
          24.93332,
          67.1117
        ],
        [
          24.93367,
          67.11145
        ]
      ],
      "nearestNode": "n_central_ave_mid",
      "keywords": [
        "industrial",
        "manufacturing",
        "imd",
        "automation",
        "cad cam",
        "operations",
        "14",
        "14a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 3,
      "description": "Department of Industrial & Manufacturing Engineering and IMD CAD/CAM & Metrology Labs (14A)."
    },
    {
      "id": "poi-14a",
      "blockNumber": "14A",
      "name": "IMD Labs (Industrial & Manufacturing Labs)",
      "shortName": "IMD Labs (14A)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.93323,
        67.1128
      ],
      "entrance_coords": [
        24.93338,
        67.11269
      ],
      "footprintPolygon": [
        [
          24.93343,
          67.11279
        ],
        [
          24.93313,
          67.11299
        ],
        [
          24.93303,
          67.11281
        ],
        [
          24.93333,
          67.11261
        ]
      ],
      "nearestNode": "n_central_ave_north_mid",
      "keywords": [
        "imd labs",
        "cnc",
        "metrology",
        "ergonomics",
        "14a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Flexible Manufacturing Systems, CNC Machining, and Quality Control laboratories."
    },
    {
      "id": "poi-15",
      "blockNumber": "15",
      "name": "CIS Lecture Hall & Class Rooms (15, 15A CIS Labs)",
      "shortName": "CIS Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93275,
        67.11207
      ],
      "entrance_coords": [
        24.93291,
        67.11195
      ],
      "footprintPolygon": [
        [
          24.93299,
          67.11208
        ],
        [
          24.93266,
          67.11231
        ],
        [
          24.93251,
          67.11206
        ],
        [
          24.93284,
          67.11183
        ]
      ],
      "nearestNode": "n_cis_plaza",
      "keywords": [
        "cis",
        "computer systems",
        "computer engineering",
        "hardware",
        "embedded",
        "15",
        "15a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 3,
      "description": "Department of Computer & Information Systems Engineering lecture halls and specialized CIS Labs (15A)."
    },
    {
      "id": "poi-15a",
      "blockNumber": "15A",
      "name": "CIS Engineering Labs",
      "shortName": "CIS Labs (15A)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.93283,
        67.11147
      ],
      "entrance_coords": [
        24.93298,
        67.11137
      ],
      "footprintPolygon": [
        [
          24.93301,
          67.11156
        ],
        [
          24.93283,
          67.11169
        ],
        [
          24.93265,
          67.11138
        ],
        [
          24.93283,
          67.11125
        ]
      ],
      "nearestNode": "n_central_ave_south_mid",
      "keywords": [
        "cis labs",
        "microprocessor",
        "digital logic",
        "vlsi",
        "robotics",
        "15a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 3,
      "description": "Digital Logic, Microprocessor Systems, Parallel Processing, and Computer Architecture labs."
    },
    {
      "id": "poi-16",
      "blockNumber": "16",
      "name": "Petroleum Engineering Dept. & Labs (16, 16A)",
      "shortName": "Petroleum Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93341,
        67.11433
      ],
      "entrance_coords": [
        24.93331,
        67.11416
      ],
      "footprintPolygon": [
        [
          24.93364,
          67.11432
        ],
        [
          24.9333,
          67.11456
        ],
        [
          24.93318,
          67.11434
        ],
        [
          24.93352,
          67.1141
        ]
      ],
      "nearestNode": "n_north_acad_east",
      "keywords": [
        "petroleum",
        "ped",
        "oil",
        "gas",
        "drilling",
        "reservoir",
        "16",
        "16a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Department of Petroleum Engineering and Reservoir/Drilling Fluid Labs (16A)."
    },
    {
      "id": "poi-16a",
      "blockNumber": "16A",
      "name": "Petroleum Engineering Labs (PED Labs)",
      "shortName": "PED Labs (16A)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.93359,
        67.11465
      ],
      "entrance_coords": [
        24.93351,
        67.11451
      ],
      "footprintPolygon": [
        [
          24.93382,
          67.11463
        ],
        [
          24.93347,
          67.11487
        ],
        [
          24.93336,
          67.11467
        ],
        [
          24.93371,
          67.11443
        ]
      ],
      "nearestNode": "n_north_acad_east",
      "keywords": [
        "ped labs",
        "petroleum lab",
        "core analysis",
        "drilling",
        "16a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Core Analysis, Drilling Engineering, and Reservoir Simulation laboratories."
    },
    {
      "id": "poi-17",
      "blockNumber": "17",
      "name": "Textile Engineering Dept. & Labs (17, 17A)",
      "shortName": "Textile Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93371,
        67.11383
      ],
      "entrance_coords": [
        24.93362,
        67.11365
      ],
      "footprintPolygon": [
        [
          24.93394,
          67.11383
        ],
        [
          24.93361,
          67.11406
        ],
        [
          24.93348,
          67.11383
        ],
        [
          24.93381,
          67.1136
        ]
      ],
      "nearestNode": "n_north_acad_mid",
      "keywords": [
        "textile",
        "spinning",
        "weaving",
        "garments",
        "dyeing",
        "17",
        "17a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Department of Textile Engineering with spinning, weaving, and textile wet-processing laboratories (17A)."
    },
    {
      "id": "poi-17a",
      "blockNumber": "17A",
      "name": "Textile Engineering Labs",
      "shortName": "Textile Labs (17A)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.93397,
        67.11428
      ],
      "entrance_coords": [
        24.93387,
        67.1141
      ],
      "footprintPolygon": [
        [
          24.93419,
          67.11428
        ],
        [
          24.93387,
          67.11449
        ],
        [
          24.93375,
          67.11428
        ],
        [
          24.93407,
          67.11407
        ]
      ],
      "nearestNode": "n_north_acad_mid",
      "keywords": [
        "textile labs",
        "weaving lab",
        "spinning lab",
        "testing",
        "17a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 1,
      "description": "Pilot-scale spinning, weaving, knitting, and fabric testing laboratories."
    },
    {
      "id": "poi-18",
      "blockNumber": "18",
      "name": "Automotive & Marine Engineering Dept.",
      "shortName": "Automotive Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.9332,
        67.11355
      ],
      "entrance_coords": [
        24.93308,
        67.11334
      ],
      "footprintPolygon": [
        [
          24.93351,
          67.1135
        ],
        [
          24.93303,
          67.11384
        ],
        [
          24.93289,
          67.1136
        ],
        [
          24.93337,
          67.11326
        ]
      ],
      "nearestNode": "n_north_ave_mid",
      "keywords": [
        "automotive",
        "marine",
        "automobile",
        "vehicle",
        "engine",
        "18",
        "18a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Department of Automotive and Marine Engineering featuring vehicle dynamics and propulsion labs."
    },
    {
      "id": "poi-19",
      "blockNumber": "19",
      "name": "Electronic Engineering Dept. & Labs (19, 19A, 19B)",
      "shortName": "Electronic Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93394,
        67.11313
      ],
      "entrance_coords": [
        24.9338,
        67.11289
      ],
      "footprintPolygon": [
        [
          24.9342,
          67.11317
        ],
        [
          24.93386,
          67.11341
        ],
        [
          24.93368,
          67.11309
        ],
        [
          24.93402,
          67.11285
        ]
      ],
      "nearestNode": "n_north_ave_west",
      "keywords": [
        "electronic",
        "electronics",
        "telecom",
        "telecommunications",
        "pcb",
        "fpga",
        "19",
        "19a",
        "19b"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 3,
      "description": "Department of Electronic Engineering, Electronic Labs (19A), and Telecommunications Labs (19B)."
    },
    {
      "id": "poi-19a",
      "blockNumber": "19A",
      "name": "Electronic Engineering Labs",
      "shortName": "Electronic Labs (19A)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.9342,
        67.11359
      ],
      "entrance_coords": [
        24.9341,
        67.11341
      ],
      "footprintPolygon": [
        [
          24.93444,
          67.1136
        ],
        [
          24.9341,
          67.11383
        ],
        [
          24.93396,
          67.11358
        ],
        [
          24.9343,
          67.11335
        ]
      ],
      "nearestNode": "n_north_acad_west",
      "keywords": [
        "electronic labs",
        "analog",
        "power electronics",
        "instrumentation",
        "19a"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Solid-state electronics, instrumentation, and industrial control laboratories."
    },
    {
      "id": "poi-19b",
      "blockNumber": "19B",
      "name": "Telecommunications Engineering Labs",
      "shortName": "Telecom Labs (19B)",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.93314,
        67.11252
      ],
      "entrance_coords": [
        24.93328,
        67.11242
      ],
      "footprintPolygon": [
        [
          24.93331,
          67.11253
        ],
        [
          24.93307,
          67.11269
        ],
        [
          24.93297,
          67.11251
        ],
        [
          24.93321,
          67.11235
        ]
      ],
      "nearestNode": "n_central_ave_north_mid",
      "keywords": [
        "telecom",
        "telecommunications",
        "rf",
        "microwave",
        "antenna",
        "fiber",
        "19b"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "RF & Microwave, Optical Fiber, and Wireless Communication systems laboratories."
    },
    {
      "id": "poi-20",
      "blockNumber": "20",
      "name": "Environmental Engineering Dept.",
      "shortName": "Environmental Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93432,
        67.11285
      ],
      "entrance_coords": [
        24.93419,
        67.11262
      ],
      "footprintPolygon": [
        [
          24.93455,
          67.11284
        ],
        [
          24.93421,
          67.11308
        ],
        [
          24.93409,
          67.11286
        ],
        [
          24.93443,
          67.11262
        ]
      ],
      "nearestNode": "n_west_ave_north",
      "keywords": [
        "environmental",
        "water",
        "sustainability",
        "climate",
        "waste",
        "20"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Department of Environmental Engineering specializing in water treatment, air quality, and environmental impact."
    },
    {
      "id": "poi-21",
      "blockNumber": "21",
      "name": "Metallurgical Engineering Dept.",
      "shortName": "Metallurgy Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93375,
        67.11198
      ],
      "entrance_coords": [
        24.93352,
        67.11214
      ],
      "footprintPolygon": [
        [
          24.93398,
          67.11197
        ],
        [
          24.93364,
          67.11221
        ],
        [
          24.93352,
          67.11199
        ],
        [
          24.93386,
          67.11175
        ]
      ],
      "nearestNode": "n_central_ave_mid",
      "keywords": [
        "metallurgy",
        "metallurgical",
        "metals",
        "casting",
        "welding",
        "corrosion",
        "21"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Department of Metallurgical Engineering housing physical metallurgy, foundry, and corrosion labs."
    },
    {
      "id": "poi-22",
      "blockNumber": "22",
      "name": "Polymer & Petrochemical Engineering Dept.",
      "shortName": "Polymer Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93458,
        67.11061
      ],
      "entrance_coords": [
        24.93432,
        67.11084
      ],
      "footprintPolygon": [
        [
          24.93489,
          67.11067
        ],
        [
          24.93449,
          67.11094
        ],
        [
          24.93427,
          67.11055
        ],
        [
          24.93467,
          67.11028
        ]
      ],
      "nearestNode": "n_west_loop_mid",
      "keywords": [
        "polymer",
        "petrochemical",
        "plastics",
        "elastomers",
        "chemical",
        "22"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Distinctive octagonal academic complex housing the Department of Polymer & Petrochemical Engineering."
    },
    {
      "id": "poi-23",
      "blockNumber": "23",
      "name": "Materials Engineering Dept.",
      "shortName": "Materials Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.9346,
        67.11165
      ],
      "entrance_coords": [
        24.93476,
        67.11193
      ],
      "footprintPolygon": [
        [
          24.93489,
          67.11165
        ],
        [
          24.93448,
          67.11194
        ],
        [
          24.93431,
          67.11165
        ],
        [
          24.93472,
          67.11136
        ]
      ],
      "nearestNode": "n_west_ave_mid",
      "keywords": [
        "materials",
        "ceramics",
        "nanotechnology",
        "composites",
        "semiconductors",
        "23"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Department of Materials Engineering focusing on advanced ceramics, composites, and nanomaterials."
    },
    {
      "id": "poi-24",
      "blockNumber": "24",
      "name": "Chemical Engineering Dept.",
      "shortName": "Chemical Engg.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93528,
        67.11113
      ],
      "entrance_coords": [
        24.93546,
        67.11144
      ],
      "footprintPolygon": [
        [
          24.93557,
          67.11113
        ],
        [
          24.93516,
          67.11142
        ],
        [
          24.93499,
          67.11113
        ],
        [
          24.9354,
          67.11084
        ]
      ],
      "nearestNode": "n_west_ave_outer",
      "keywords": [
        "chemical",
        "process",
        "unit operations",
        "reactor",
        "thermodynamics",
        "24"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 3,
      "description": "Department of Chemical Engineering with unit operations, process control, and reaction engineering labs."
    },
    {
      "id": "poi-25",
      "blockNumber": "25",
      "name": "Admission Centre",
      "shortName": "Admission Centre",
      "category": "Administration",
      "major": true,
      "coordinates": [
        24.93001,
        67.11258
      ],
      "entrance_coords": [
        24.9301,
        67.11274
      ],
      "footprintPolygon": [
        [
          24.93023,
          67.11256
        ],
        [
          24.9299,
          67.11278
        ],
        [
          24.92979,
          67.1126
        ],
        [
          24.93012,
          67.11238
        ]
      ],
      "nearestNode": "n_south_ave_east",
      "keywords": [
        "admission",
        "admissions",
        "registration",
        "enrollment",
        "entry test",
        "student affairs",
        "25"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Undergraduate and postgraduate admissions, student verification, and entry test center near University Road Gate."
    },
    {
      "id": "poi-26",
      "blockNumber": "26",
      "name": "Food Centre / Main Student Cafeterias",
      "shortName": "Food Centre",
      "category": "Cafeteria",
      "major": true,
      "coordinates": [
        24.9308,
        67.11193
      ],
      "entrance_coords": [
        24.93094,
        67.11216
      ],
      "footprintPolygon": [
        [
          24.93101,
          67.11191
        ],
        [
          24.9307,
          67.11213
        ],
        [
          24.93059,
          67.11195
        ],
        [
          24.9309,
          67.11173
        ]
      ],
      "nearestNode": "n_south_ave_food",
      "keywords": [
        "food",
        "cafeteria",
        "canteen",
        "lunch",
        "snacks",
        "dms",
        "coffee",
        "tea",
        "26"
      ],
      "buildingHours": "07:30 AM – 06:00 PM",
      "floorCount": 1,
      "description": "Main student food court and cafeterias along the Southern Boulevard."
    },
    {
      "id": "poi-27",
      "blockNumber": "27",
      "name": "Administration Block (VC Secretariat & Registrar)",
      "shortName": "Admin Block",
      "category": "Administration",
      "major": true,
      "coordinates": [
        24.93273,
        67.11028
      ],
      "entrance_coords": [
        24.93299,
        67.11058
      ],
      "footprintPolygon": [
        [
          24.93305,
          67.11028
        ],
        [
          24.93259,
          67.1106
        ],
        [
          24.93241,
          67.11028
        ],
        [
          24.93287,
          67.10996
        ]
      ],
      "nearestNode": "n_south_ave_admin",
      "keywords": [
        "admin",
        "administration",
        "vc",
        "vice chancellor",
        "registrar",
        "examinations",
        "finance",
        "27",
        "white house"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 3,
      "description": "Central Administration Building (NED White House) housing the Vice Chancellor's Office, Registrar, and Examinations."
    },
    {
      "id": "poi-28",
      "blockNumber": "28",
      "name": "Dean Offices & Academic Secretariats",
      "shortName": "Dean Offices",
      "category": "Administration",
      "major": true,
      "coordinates": [
        24.9324,
        67.11065
      ],
      "entrance_coords": [
        24.93256,
        67.11093
      ],
      "footprintPolygon": [
        [
          24.93264,
          67.11066
        ],
        [
          24.93231,
          67.11089
        ],
        [
          24.93216,
          67.11064
        ],
        [
          24.93249,
          67.11041
        ]
      ],
      "nearestNode": "n_south_ave_deans",
      "keywords": [
        "dean",
        "deans",
        "faculty",
        "academic",
        "cpl",
        "28"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Offices of the Deans of Engineering, Architecture, and Sciences along the main boulevard."
    },
    {
      "id": "poi-29",
      "blockNumber": "29",
      "name": "Medical Department & Campus Clinic",
      "shortName": "Medical Dept.",
      "category": "Emergency",
      "major": true,
      "coordinates": [
        24.93209,
        67.11099
      ],
      "entrance_coords": [
        24.93222,
        67.11122
      ],
      "footprintPolygon": [
        [
          24.93224,
          67.11103
        ],
        [
          24.93206,
          67.11116
        ],
        [
          24.93194,
          67.11095
        ],
        [
          24.93212,
          67.11082
        ]
      ],
      "nearestNode": "n_south_ave_medical",
      "keywords": [
        "medical",
        "clinic",
        "dispensary",
        "doctor",
        "first aid",
        "ambulance",
        "health",
        "emergency",
        "29"
      ],
      "buildingHours": "24/7 Emergency • 08:00 AM – 08:00 PM OPD",
      "floorCount": 1,
      "description": "Campus Medical Centre providing primary healthcare, emergency first aid, and ambulance services."
    },
    {
      "id": "poi-30",
      "blockNumber": "30",
      "name": "Humanities Department",
      "shortName": "Humanities Dept.",
      "category": "Academic",
      "major": true,
      "coordinates": [
        24.93189,
        67.1113
      ],
      "entrance_coords": [
        24.93197,
        67.11144
      ],
      "footprintPolygon": [
        [
          24.93206,
          67.1113
        ],
        [
          24.93182,
          67.11147
        ],
        [
          24.93172,
          67.1113
        ],
        [
          24.93196,
          67.11113
        ]
      ],
      "nearestNode": "n_south_ave_humanities",
      "keywords": [
        "humanities",
        "english",
        "islamiat",
        "pakistan studies",
        "linguistics",
        "economics",
        "30"
      ],
      "buildingHours": "08:30 AM – 04:30 PM",
      "floorCount": 2,
      "description": "Department of Humanities offering courses in English, Communication, Ethics, and Social Sciences."
    },
    {
      "id": "poi-library",
      "blockNumber": "LIB",
      "name": "Engr. Abul Kalam Library (Circulation Library)",
      "shortName": "Central Library",
      "category": "Library",
      "major": true,
      "coordinates": [
        24.93331,
        67.11113
      ],
      "entrance_coords": [
        24.93304,
        67.11131
      ],
      "footprintPolygon": [
        [
          24.93359,
          67.11117
        ],
        [
          24.93322,
          67.11143
        ],
        [
          24.93303,
          67.11109
        ],
        [
          24.9334,
          67.11083
        ]
      ],
      "nearestNode": "n_central_ave_south_mid",
      "keywords": [
        "library",
        "books",
        "reading room",
        "study",
        "digital library",
        "abul kalam",
        "circulation"
      ],
      "buildingHours": "08:00 AM – 08:00 PM",
      "floorCount": 4,
      "description": "Engr. Abul Kalam Central Circulation Library featuring digital archives, quiet study zones, and reference collections."
    },
    {
      "id": "poi-masjid",
      "blockNumber": "MSJ",
      "name": "Main Campus Masjid",
      "shortName": "Main Masjid",
      "category": "Services",
      "major": true,
      "coordinates": [
        24.93427,
        67.11106
      ],
      "entrance_coords": [
        24.93401,
        67.11125
      ],
      "footprintPolygon": [
        [
          24.93447,
          67.11108
        ],
        [
          24.9342,
          67.11127
        ],
        [
          24.93407,
          67.11104
        ],
        [
          24.93434,
          67.11085
        ]
      ],
      "nearestNode": "n_masjid_plaza",
      "keywords": [
        "masjid",
        "mosque",
        "prayer",
        "namaz",
        "jumma"
      ],
      "buildingHours": "Open for All Daily Prayers",
      "floorCount": 2,
      "description": "Central Jamia Masjid located between the Library, Materials Engineering, and Polymer Engineering."
    },
    {
      "id": "poi-hpcc",
      "blockNumber": "HPC",
      "name": "High Performance Computing Centre (HPCC)",
      "shortName": "HPC Centre",
      "category": "Labs",
      "major": false,
      "coordinates": [
        24.9339,
        67.11233
      ],
      "entrance_coords": [
        24.93402,
        67.11254
      ],
      "footprintPolygon": [
        [
          24.93411,
          67.11232
        ],
        [
          24.9338,
          67.11254
        ],
        [
          24.93369,
          67.11234
        ],
        [
          24.934,
          67.11212
        ]
      ],
      "nearestNode": "n_west_ave_north",
      "keywords": [
        "hpc",
        "high performance computing",
        "supercomputer",
        "data center",
        "ai",
        "cluster"
      ],
      "buildingHours": "08:30 AM – 05:00 PM",
      "floorCount": 2,
      "description": "High Performance Computing Centre supporting parallel simulation, AI research, and scientific modeling."
    },
    {
      "id": "poi-central-store",
      "blockNumber": "STR",
      "name": "Central Store & Procurement",
      "shortName": "Central Store",
      "category": "Services",
      "major": false,
      "coordinates": [
        24.93298,
        67.11411
      ],
      "entrance_coords": [
        24.93285,
        67.1142
      ],
      "footprintPolygon": [
        [
          24.93312,
          67.11417
        ],
        [
          24.93297,
          67.11428
        ],
        [
          24.93284,
          67.11405
        ],
        [
          24.93299,
          67.11394
        ]
      ],
      "nearestNode": "n_sports_road_mid",
      "keywords": [
        "store",
        "central store",
        "procurement",
        "inventory",
        "supplies"
      ],
      "buildingHours": "08:30 AM – 04:00 PM",
      "floorCount": 1,
      "description": "Central university inventory, equipment store, and logistics depot."
    },
    {
      "id": "poi-cricket",
      "blockNumber": "CRK",
      "name": "NED Cricket Ground",
      "shortName": "Cricket Ground",
      "category": "Sports",
      "major": true,
      "coordinates": [
        24.93202,
        67.11531
      ],
      "entrance_coords": [
        24.93181,
        67.11467
      ],
      "footprintPolygon": null,
      "nearestNode": "n_cricket_south",
      "keywords": [
        "cricket",
        "ground",
        "stadium",
        "sports",
        "safe zone",
        "assembly point"
      ],
      "buildingHours": "06:00 AM – 07:00 PM",
      "floorCount": 1,
      "description": "Full-size turf cricket oval and primary open-air emergency assembly safe zone."
    },
    {
      "id": "poi-soccer",
      "blockNumber": "SOC",
      "name": "Soccer Field & Athletics Track",
      "shortName": "Soccer Field",
      "category": "Sports",
      "major": true,
      "coordinates": [
        24.93153,
        67.11687
      ],
      "entrance_coords": [
        24.9313,
        67.11585
      ],
      "footprintPolygon": null,
      "nearestNode": "n_parking_east",
      "keywords": [
        "soccer",
        "football",
        "field",
        "track",
        "athletics",
        "sports",
        "safe zone"
      ],
      "buildingHours": "06:00 AM – 07:00 PM",
      "floorCount": 1,
      "description": "Lush football field and running track in the eastern sports enclave."
    },
    {
      "id": "poi-gym",
      "blockNumber": "GYM",
      "name": "Gymnasium & Girls Gymnasium",
      "shortName": "Gymnasium",
      "category": "Sports",
      "major": true,
      "coordinates": [
        24.9331,
        67.11553
      ],
      "entrance_coords": [
        24.93299,
        67.11521
      ],
      "footprintPolygon": [
        [
          24.93333,
          67.11556
        ],
        [
          24.93303,
          67.11577
        ],
        [
          24.93287,
          67.1155
        ],
        [
          24.93317,
          67.11529
        ]
      ],
      "nearestNode": "n_sports_north",
      "keywords": [
        "gym",
        "gymnasium",
        "fitness",
        "indoor sports",
        "badminton",
        "girls gym"
      ],
      "buildingHours": "08:00 AM – 06:00 PM",
      "floorCount": 2,
      "description": "Main Boys Gymnasium and separate Girls Gymnasium for indoor sports, fitness, and table tennis."
    },
    {
      "id": "poi-squash",
      "blockNumber": "SQH",
      "name": "Squash Complex & Tennis Courts",
      "shortName": "Squash & Tennis",
      "category": "Sports",
      "major": false,
      "coordinates": [
        24.93285,
        67.11611
      ],
      "entrance_coords": [
        24.93276,
        67.11561
      ],
      "footprintPolygon": [
        [
          24.93306,
          67.11611
        ],
        [
          24.93276,
          67.11632
        ],
        [
          24.93264,
          67.11611
        ],
        [
          24.93294,
          67.1159
        ]
      ],
      "nearestNode": "n_sports_north",
      "keywords": [
        "squash",
        "tennis",
        "court",
        "sports"
      ],
      "buildingHours": "08:00 AM – 06:00 PM",
      "floorCount": 2,
      "description": "Glass-back squash courts and outdoor hard-surface tennis courts."
    },
    {
      "id": "poi-boys-hostel",
      "blockNumber": "H-B",
      "name": "Boys Hostel & Hostel Student Cafeteria",
      "shortName": "Boys Hostel",
      "category": "Hostels",
      "major": true,
      "coordinates": [
        24.93548,
        67.11235
      ],
      "entrance_coords": [
        24.93478,
        67.11235
      ],
      "footprintPolygon": [
        [
          24.93589,
          67.11233
        ],
        [
          24.93529,
          67.11275
        ],
        [
          24.93507,
          67.11237
        ],
        [
          24.93567,
          67.11195
        ]
      ],
      "nearestNode": "n_hostel_boys_gate",
      "keywords": [
        "boys hostel",
        "hostel",
        "dormitory",
        "residence",
        "accommodation"
      ],
      "buildingHours": "Open 24 Hours (Residents)",
      "floorCount": 3,
      "description": "On-campus residential wings for male students with dedicated dining hall and recreation area."
    },
    {
      "id": "poi-girls-hostel",
      "blockNumber": "H-G",
      "name": "Girls Hostel & Bus Shed",
      "shortName": "Girls Hostel",
      "category": "Hostels",
      "major": true,
      "coordinates": [
        24.93447,
        67.10911
      ],
      "entrance_coords": [
        24.93428,
        67.10973
      ],
      "footprintPolygon": [
        [
          24.9348,
          67.10909
        ],
        [
          24.93431,
          67.10943
        ],
        [
          24.93414,
          67.10913
        ],
        [
          24.93463,
          67.10879
        ]
      ],
      "nearestNode": "n_west_loop_south",
      "keywords": [
        "girls hostel",
        "female hostel",
        "dormitory",
        "bus shed",
        "shuttle"
      ],
      "buildingHours": "Open 24 Hours (Residents)",
      "floorCount": 3,
      "description": "Secure residential complex for female students located near the Campus Bus Shed."
    },
    {
      "id": "poi-north-cafe",
      "blockNumber": "CAF",
      "name": "Sports Complex Cafeteria",
      "shortName": "Sports Cafeteria",
      "category": "Cafeteria",
      "major": false,
      "coordinates": [
        24.93254,
        67.11435
      ],
      "entrance_coords": [
        24.9324,
        67.11411
      ],
      "footprintPolygon": [
        [
          24.93268,
          67.11436
        ],
        [
          24.93248,
          67.1145
        ],
        [
          24.9324,
          67.11434
        ],
        [
          24.9326,
          67.1142
        ]
      ],
      "nearestNode": "n_sports_road_south",
      "keywords": [
        "cafeteria",
        "sports cafe",
        "canteen",
        "snacks",
        "drinks",
        "food"
      ],
      "buildingHours": "08:00 AM – 05:00 PM",
      "floorCount": 1,
      "description": "Open-air student cafeteria adjacent to the Cricket Ground and Automotive Engineering."
    },
    {
      "id": "poi-hostel-cafe",
      "blockNumber": "MCF",
      "name": "Hostel Student Cafeteria",
      "shortName": "Hostel Cafeteria",
      "category": "Cafeteria",
      "major": false,
      "coordinates": [
        24.93481,
        67.11225
      ],
      "entrance_coords": [
        24.93472,
        67.1121
      ],
      "footprintPolygon": [
        [
          24.93497,
          67.11225
        ],
        [
          24.93474,
          67.11241
        ],
        [
          24.93465,
          67.11225
        ],
        [
          24.93488,
          67.11209
        ]
      ],
      "nearestNode": "n_west_ave_mid",
      "keywords": [
        "cafeteria",
        "hostel canteen",
        "mess",
        "food",
        "west cafe"
      ],
      "buildingHours": "07:30 AM – 09:00 PM",
      "floorCount": 1,
      "description": "Cafeteria serving the Chemical/Materials Engineering blocks and Boys Hostels."
    },
    {
      "id": "poi-gate-main",
      "blockNumber": "G1",
      "name": "Main Gate (University Road Admissions Entrance)",
      "shortName": "Main Gate (G1)",
      "category": "Gate",
      "major": true,
      "coordinates": [
        24.92901,
        67.1135
      ],
      "entrance_coords": [
        24.92901,
        67.1135
      ],
      "footprintPolygon": null,
      "nearestNode": "n_gate_main",
      "keywords": [
        "main gate",
        "gate 1",
        "entrance",
        "exit",
        "university road",
        "admission gate",
        "emergency exit"
      ],
      "buildingHours": "Open 24 Hours",
      "floorCount": 1,
      "description": "Primary ceremonial and pedestrian entrance on University Road leading to Admissions, Food Centre, and Admin Block."
    },
    {
      "id": "poi-gate-north",
      "blockNumber": "G2",
      "name": "Bank & Sports Gate (University Road Entrance)",
      "shortName": "Bank Gate (G2)",
      "category": "Gate",
      "major": true,
      "coordinates": [
        24.93006,
        67.11555
      ],
      "entrance_coords": [
        24.93006,
        67.11555
      ],
      "footprintPolygon": null,
      "nearestNode": "n_gate_north",
      "keywords": [
        "north gate",
        "gate 2",
        "bank gate",
        "car parking",
        "entrance",
        "exit",
        "emergency exit"
      ],
      "buildingHours": "07:00 AM – 10:00 PM",
      "floorCount": 1,
      "description": "Vehicular and pedestrian entrance on University Road adjacent to NBP Bank and Main Car Parking."
    }
  ],
  "walkwayGraph": {
    "nodes": {
      "n_gate_main": {
        "lat": 24.92901,
        "lng": 67.1135,
        "label": "Main Gate (University Road)"
      },
      "n_gate_north": {
        "lat": 24.93006,
        "lng": 67.11555,
        "label": "Bank Gate (University Road)"
      },
      "n_gate_north_inner": {
        "lat": 24.93036,
        "lng": 67.11534,
        "label": "Bank & Security Plaza"
      },
      "n_parking_east": {
        "lat": 24.93086,
        "lng": 67.11499,
        "label": "Main Car Parking Walkway"
      },
      "n_cricket_south": {
        "lat": 24.93167,
        "lng": 67.11443,
        "label": "Cricket Ground Avenue"
      },
      "n_sports_road_south": {
        "lat": 24.93232,
        "lng": 67.11397,
        "label": "Sports Road & Cafeteria Junction"
      },
      "n_sports_road_mid": {
        "lat": 24.93293,
        "lng": 67.11442,
        "label": "Central Store Walkway"
      },
      "n_sports_north": {
        "lat": 24.93299,
        "lng": 67.11521,
        "label": "Gymnasium & Squash Plaza"
      },
      "n_south_ave_east": {
        "lat": 24.9301,
        "lng": 67.11274,
        "label": "Admission Centre Boulevard"
      },
      "n_south_ave_csit_jct": {
        "lat": 24.93056,
        "lng": 67.11242,
        "label": "CSIT Walkway Junction"
      },
      "n_south_ave_food": {
        "lat": 24.93094,
        "lng": 67.11216,
        "label": "Food Centre Plaza"
      },
      "n_south_ave_fountain_jct": {
        "lat": 24.93131,
        "lng": 67.1119,
        "label": "Central Courtyard Junction"
      },
      "n_south_ave_humanities": {
        "lat": 24.93197,
        "lng": 67.11144,
        "label": "Humanities Crossing"
      },
      "n_south_ave_medical": {
        "lat": 24.93224,
        "lng": 67.11125,
        "label": "Medical Centre Crossing"
      },
      "n_south_ave_deans": {
        "lat": 24.9326,
        "lng": 67.111,
        "label": "Dean Offices Crossing"
      },
      "n_south_ave_central_jct": {
        "lat": 24.93277,
        "lng": 67.11088,
        "label": "Central Spine Junction"
      },
      "n_south_ave_admin": {
        "lat": 24.93305,
        "lng": 67.11068,
        "label": "Administration Block Plaza"
      },
      "n_west_loop_south": {
        "lat": 24.93411,
        "lng": 67.10995,
        "label": "Girls Hostel & Bus Shed Road"
      },
      "n_east_acad_south": {
        "lat": 24.9309,
        "lng": 67.11301,
        "label": "Video Conferencing Walkway"
      },
      "n_csit_south": {
        "lat": 24.93105,
        "lng": 67.11328,
        "label": "CSIT South Path"
      },
      "n_csit_mid": {
        "lat": 24.93121,
        "lng": 67.11356,
        "label": "CSIT & Maths Entrance Plaza"
      },
      "n_csit_north": {
        "lat": 24.93145,
        "lng": 67.11397,
        "label": "CSIT Labs North Path"
      },
      "n_civil_south": {
        "lat": 24.93124,
        "lng": 67.11243,
        "label": "Urban Engineering Walkway"
      },
      "n_civil_mid": {
        "lat": 24.93154,
        "lng": 67.11295,
        "label": "Civil Engineering Courtyard"
      },
      "n_civil_north": {
        "lat": 24.93184,
        "lng": 67.11348,
        "label": "CED Labs North Walkway"
      },
      "n_staff_centre": {
        "lat": 24.93147,
        "lng": 67.11217,
        "label": "Staff Centre Path"
      },
      "n_fountain_south": {
        "lat": 24.93165,
        "lng": 67.11249,
        "label": "IT & Audio Visual Plaza"
      },
      "n_fountain": {
        "lat": 24.93182,
        "lng": 67.11278,
        "label": "Courtyard Fountain (Block 6)"
      },
      "n_fountain_north": {
        "lat": 24.93201,
        "lng": 67.11311,
        "label": "Girls Common Room Walkway"
      },
      "n_fountain_top": {
        "lat": 24.93249,
        "lng": 67.11366,
        "label": "Central Intersection"
      },
      "n_mech_south": {
        "lat": 24.9319,
        "lng": 67.11193,
        "label": "Mechanical Engineering Walk"
      },
      "n_elec_mid": {
        "lat": 24.93208,
        "lng": 67.11224,
        "label": "Electrical Engineering Plaza"
      },
      "n_elec_north": {
        "lat": 24.93235,
        "lng": 67.11271,
        "label": "EED Labs Corridor"
      },
      "n_mech_north": {
        "lat": 24.93253,
        "lng": 67.11303,
        "label": "MED Labs Corridor"
      },
      "n_cis_plaza": {
        "lat": 24.93275,
        "lng": 67.11207,
        "label": "CIS Engineering Courtyard"
      },
      "n_central_ave_south_mid": {
        "lat": 24.93303,
        "lng": 67.11134,
        "label": "Library & CIS Labs Avenue"
      },
      "n_central_ave_mid": {
        "lat": 24.9334,
        "lng": 67.112,
        "label": "Industrial & Metallurgy Crossing"
      },
      "n_central_ave_north_mid": {
        "lat": 24.93364,
        "lng": 67.11241,
        "label": "Telecom & IMD Labs Crossing"
      },
      "n_north_ave_west": {
        "lat": 24.93382,
        "lng": 67.11273,
        "label": "Electronic Engineering Intersection"
      },
      "n_north_ave_mid": {
        "lat": 24.93304,
        "lng": 67.11327,
        "label": "Automotive Engineering Avenue"
      },
      "n_north_acad_west": {
        "lat": 24.9341,
        "lng": 67.11341,
        "label": "Electronic Labs Road"
      },
      "n_north_acad_mid": {
        "lat": 24.93366,
        "lng": 67.11372,
        "label": "Textile Engineering Plaza"
      },
      "n_north_acad_east": {
        "lat": 24.93329,
        "lng": 67.11412,
        "label": "Petroleum Engineering Plaza"
      },
      "n_west_ave_north": {
        "lat": 24.93413,
        "lng": 67.11251,
        "label": "Environmental & HPC Crossing"
      },
      "n_west_ave_mid": {
        "lat": 24.93477,
        "lng": 67.11207,
        "label": "Materials Engg. & Hostel Cafe Avenue"
      },
      "n_hostel_boys_gate": {
        "lat": 24.93497,
        "lng": 67.11241,
        "label": "Boys Hostel Entrance Path"
      },
      "n_west_ave_outer": {
        "lat": 24.93552,
        "lng": 67.11154,
        "label": "Chemical Engineering Avenue"
      },
      "n_masjid_plaza": {
        "lat": 24.93399,
        "lng": 67.11127,
        "label": "Main Masjid Courtyard"
      },
      "n_west_loop_mid": {
        "lat": 24.93432,
        "lng": 67.11084,
        "label": "Polymer Engineering Plaza"
      }
    },
    "edges": [
      [
        "n_gate_main",
        "n_south_ave_east",
        "Main Admissions Boulevard"
      ],
      [
        "n_gate_north",
        "n_gate_north_inner",
        "NBP Bank Entrance Road"
      ],
      [
        "n_gate_north_inner",
        "n_parking_east",
        "North Sports Avenue"
      ],
      [
        "n_parking_east",
        "n_cricket_south",
        "Cricket Ground Road"
      ],
      [
        "n_cricket_south",
        "n_sports_road_south",
        "Cricket Ground Road"
      ],
      [
        "n_sports_road_south",
        "n_fountain_top",
        "Central North Avenue"
      ],
      [
        "n_sports_road_south",
        "n_sports_road_mid",
        "Sports Complex Road"
      ],
      [
        "n_sports_road_mid",
        "n_sports_north",
        "Gymnasium Walkway"
      ],
      [
        "n_cricket_south",
        "n_sports_north",
        "Cricket Oval West Path"
      ],
      [
        "n_south_ave_east",
        "n_south_ave_csit_jct",
        "Southern Boulevard"
      ],
      [
        "n_south_ave_csit_jct",
        "n_south_ave_food",
        "Southern Boulevard"
      ],
      [
        "n_south_ave_food",
        "n_south_ave_fountain_jct",
        "Southern Boulevard"
      ],
      [
        "n_south_ave_fountain_jct",
        "n_south_ave_humanities",
        "Southern Boulevard"
      ],
      [
        "n_south_ave_humanities",
        "n_south_ave_medical",
        "Southern Boulevard"
      ],
      [
        "n_south_ave_medical",
        "n_south_ave_deans",
        "Southern Boulevard"
      ],
      [
        "n_south_ave_deans",
        "n_south_ave_central_jct",
        "Southern Boulevard"
      ],
      [
        "n_south_ave_central_jct",
        "n_south_ave_admin",
        "Administration Boulevard"
      ],
      [
        "n_south_ave_admin",
        "n_west_loop_south",
        "Girls Hostel & Bus Shed Road"
      ],
      [
        "n_south_ave_csit_jct",
        "n_east_acad_south",
        "CSIT Street 1"
      ],
      [
        "n_east_acad_south",
        "n_csit_south",
        "CSIT Street 1"
      ],
      [
        "n_csit_south",
        "n_csit_mid",
        "CSIT Street 1"
      ],
      [
        "n_csit_mid",
        "n_csit_north",
        "CSIT Street 1"
      ],
      [
        "n_csit_north",
        "n_cricket_south",
        "CSIT North Link"
      ],
      [
        "n_south_ave_food",
        "n_civil_south",
        "Civil Engineering Walk"
      ],
      [
        "n_civil_south",
        "n_civil_mid",
        "Civil Engineering Walk"
      ],
      [
        "n_civil_mid",
        "n_civil_north",
        "Civil Engineering Walk"
      ],
      [
        "n_civil_north",
        "n_sports_road_south",
        "Civil-Sports Link"
      ],
      [
        "n_east_acad_south",
        "n_civil_south",
        "Urban-CSIT Crosswalk"
      ],
      [
        "n_csit_mid",
        "n_civil_mid",
        "Civil-CSIT Plaza Link"
      ],
      [
        "n_csit_north",
        "n_civil_north",
        "Survey-CSIT Labs Link"
      ],
      [
        "n_south_ave_fountain_jct",
        "n_staff_centre",
        "Central Courtyard Walk"
      ],
      [
        "n_staff_centre",
        "n_fountain_south",
        "Central Courtyard Walk"
      ],
      [
        "n_fountain_south",
        "n_fountain",
        "Courtyard Fountain Plaza"
      ],
      [
        "n_fountain",
        "n_fountain_north",
        "Courtyard Fountain Plaza"
      ],
      [
        "n_fountain_north",
        "n_fountain_top",
        "North Courtyard Walk"
      ],
      [
        "n_civil_mid",
        "n_fountain",
        "Fountain East Arcade"
      ],
      [
        "n_civil_north",
        "n_fountain_north",
        "Fountain North-East Path"
      ],
      [
        "n_south_ave_humanities",
        "n_mech_south",
        "Mechanical South Walk"
      ],
      [
        "n_mech_south",
        "n_fountain_south",
        "Mechanical-IT Passage"
      ],
      [
        "n_mech_south",
        "n_elec_mid",
        "Electrical-Mechanical Walk"
      ],
      [
        "n_elec_mid",
        "n_fountain",
        "Auditorium Walk"
      ],
      [
        "n_elec_mid",
        "n_elec_north",
        "Electrical Engineering Walk"
      ],
      [
        "n_elec_north",
        "n_fountain_north",
        "EED-Fountain Passage"
      ],
      [
        "n_elec_north",
        "n_mech_north",
        "MED Labs Walk"
      ],
      [
        "n_mech_north",
        "n_fountain_top",
        "North Labs Connector"
      ],
      [
        "n_elec_mid",
        "n_cis_plaza",
        "CIS Courtyard Walk"
      ],
      [
        "n_elec_north",
        "n_cis_plaza",
        "CIS North Passage"
      ],
      [
        "n_south_ave_central_jct",
        "n_central_ave_south_mid",
        "NED Circular Road (Central Spine)"
      ],
      [
        "n_central_ave_south_mid",
        "n_central_ave_mid",
        "NED Circular Road (Central Spine)"
      ],
      [
        "n_central_ave_mid",
        "n_central_ave_north_mid",
        "NED Circular Road (Central Spine)"
      ],
      [
        "n_central_ave_north_mid",
        "n_north_ave_west",
        "NED Circular Road (Central Spine)"
      ],
      [
        "n_central_ave_south_mid",
        "n_mech_south",
        "CIS-Mechanical Link"
      ],
      [
        "n_central_ave_mid",
        "n_cis_plaza",
        "CIS Main Entrance Walk"
      ],
      [
        "n_central_ave_north_mid",
        "n_mech_north",
        "IMD-MED Labs Corridor"
      ],
      [
        "n_fountain_top",
        "n_north_ave_mid",
        "Automotive Avenue"
      ],
      [
        "n_north_ave_mid",
        "n_north_ave_west",
        "Electronic Avenue"
      ],
      [
        "n_north_ave_west",
        "n_north_acad_west",
        "Electronic Labs Road"
      ],
      [
        "n_north_acad_west",
        "n_north_acad_mid",
        "Textile Labs Walk"
      ],
      [
        "n_north_acad_mid",
        "n_north_acad_east",
        "Petroleum-Textile Walk"
      ],
      [
        "n_north_acad_east",
        "n_sports_road_mid",
        "Petroleum East Road"
      ],
      [
        "n_north_ave_mid",
        "n_north_acad_mid",
        "Automotive-Textile Walk"
      ],
      [
        "n_north_ave_west",
        "n_west_ave_north",
        "Environmental & HPC Avenue"
      ],
      [
        "n_west_ave_north",
        "n_west_ave_mid",
        "Materials Engineering Avenue"
      ],
      [
        "n_west_ave_mid",
        "n_hostel_boys_gate",
        "Boys Hostel Walkway"
      ],
      [
        "n_west_ave_mid",
        "n_west_ave_outer",
        "Chemical Engineering Avenue"
      ],
      [
        "n_central_ave_mid",
        "n_masjid_plaza",
        "Masjid Walkway"
      ],
      [
        "n_central_ave_south_mid",
        "n_masjid_plaza",
        "Library-Masjid Path"
      ],
      [
        "n_masjid_plaza",
        "n_west_loop_mid",
        "Polymer & Masjid Plaza"
      ],
      [
        "n_west_ave_mid",
        "n_west_loop_mid",
        "Materials-Polymer Connector"
      ],
      [
        "n_west_ave_outer",
        "n_west_loop_mid",
        "Chemical-Polymer West Road"
      ],
      [
        "n_west_loop_mid",
        "n_west_loop_south",
        "West Perimeter Road"
      ]
    ]
  }
};
