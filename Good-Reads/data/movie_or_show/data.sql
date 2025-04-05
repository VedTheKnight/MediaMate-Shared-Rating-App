
-- Genre Inserts
INSERT INTO Genre (genre_id, name) VALUES (1, 'Drama');
INSERT INTO Genre (genre_id, name) VALUES (2, 'History');

-- ContentItem Inserts
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Tango of the Widower and Its Distorting Mirror', 'The story of a man whose wife has committed suicide and appears to him as a ghost, following him everywhere and changing his personality.', 'Movie', '2020-09-23', NULL, 'https://m.media-amazon.com/images/M/MV5BZWU2NzQ4NDgtZTdlNC00OGQ4LTk0OGItMTliOTE2YTViZmE3XkEyXkFqcGdeQXVyMTAxMDQ0ODk@._V1_SX300.jpg'); -- item_id = 1
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Socialist Realism', 'A satirical reading of the process of the "Unidad Popular" of President Salvador Allende, prior to the military civic coup of 1973 in Chile. The film is a choral story, where different worlds are chained together.', 'Movie', '2023-09-23', NULL, 'https://m.media-amazon.com/images/M/MV5BMjc5ZGY1YzItOGJmOC00N2Q3LTk1NzAtYjkxYzVjMjg1ZDE3XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 2

-- ContentItemGenre Inserts
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (1, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (2, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (2, 2);
-- Genre Inserts
INSERT INTO Genre (genre_id, name) VALUES (3, 'Documentary');
INSERT INTO Genre (genre_id, name) VALUES (4, 'Horror');
INSERT INTO Genre (genre_id, name) VALUES (5, 'Music');
INSERT INTO Genre (genre_id, name) VALUES (6, 'Thriller');
INSERT INTO Genre (genre_id, name) VALUES (7, 'Unknown');
INSERT INTO Genre (genre_id, name) VALUES (8, 'Biography');
INSERT INTO Genre (genre_id, name) VALUES (9, 'Fantasy');
INSERT INTO Genre (genre_id, name) VALUES (10, 'News');
INSERT INTO Genre (genre_id, name) VALUES (11, 'Action');
INSERT INTO Genre (genre_id, name) VALUES (12, 'Comedy');
INSERT INTO Genre (genre_id, name) VALUES (13, 'Sci-Fi');
INSERT INTO Genre (genre_id, name) VALUES (14, 'Game-Show');
INSERT INTO Genre (genre_id, name) VALUES (15, 'Reality-TV');
INSERT INTO Genre (genre_id, name) VALUES (16, 'Adventure');
INSERT INTO Genre (genre_id, name) VALUES (17, 'Sport');
INSERT INTO Genre (genre_id, name) VALUES (18, 'Family');
INSERT INTO Genre (genre_id, name) VALUES (19, 'Mystery');
INSERT INTO Genre (genre_id, name) VALUES (20, 'Crime');
INSERT INTO Genre (genre_id, name) VALUES (21, 'Romance');
INSERT INTO Genre (genre_id, name) VALUES (22, 'War');
INSERT INTO Genre (genre_id, name) VALUES (23, 'Animation');
INSERT INTO Genre (genre_id, name) VALUES (24, 'Musical');
INSERT INTO Genre (genre_id, name) VALUES (25, 'Short');

-- ContentItem Inserts
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Uma História de Comboios', 'N/A', 'Movie', '2022-01-01', NULL, 'N/A'); -- item_id = 6
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Grizzly II: Revenge', 'All hell breaks loose when a giant Grizzly, reacting to the slaughter of Grizzlies by poachers, attacks at a massive big-band rock concert in the National Park.', 'Movie', '2021-01-08', NULL, 'https://m.media-amazon.com/images/M/MV5BMDI3MjVjZDMtYWFhYy00NWIyLWFiZWQtMzFjYmFjMmVkZmI5XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 7
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Loading Ludwig', 'In the 21st century, Mimi wakes up and her computer relays the order: "Go back to start. Let''s load Ludwig!" A sort of chase through her past and future begins.', 'Movie', '2022-10-21', NULL, 'https://m.media-amazon.com/images/M/MV5BZjFkYTM0Y2ItNzRjZC00NjkxLTg5ODctNjUyOGYzZGYzYzE2XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 8
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Neues in Wittstock', 'Volker Koepp again visits Wittstock an der Dosse in the German state Mark Brandenburg, apx. 90 kilometers from Berlin. This time he interviews female workers in the local textile industry about their experiences after the re-unifi...', 'Movie', '2021-04-30', NULL, 'https://m.media-amazon.com/images/M/MV5BNTk4ODExMjItMWIxOS00ZDMyLTlkYWYtNjc2MDZlMjVkNTY4XkEyXkFqcGdeQXVyMTQ0MzMwNQ@@._V1_SX300.jpg'); -- item_id = 9
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('A Dangerous Practice', 'Through the spirit of Dr. Fritz, a German doctor who died during the First World War, José Arigó became a hope for a cure for millions of people by performing spiritual surgery, helping about 2 million people.', 'Movie', '2022-02-24', NULL, 'https://m.media-amazon.com/images/M/MV5BMzQzZGQwYmYtMWEyNy00MjZkLWE5OTAtYmIyNDg1NTRiMDdjXkEyXkFqcGdeQXVyNTEyMjMxNw@@._V1_SX300.jpg'); -- item_id = 10
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Nine Ball', 'N/A', 'Movie', '2023-03-25', NULL, 'https://m.media-amazon.com/images/M/MV5BNGMyNmQyYTctYTlmNS00NzAzLWI5ZDQtY2UwN2Q0N2U0Mzk5XkEyXkFqcGdeQXVyNDY5NzM3NzY@._V1_SX300.jpg'); -- item_id = 11
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Yo-TV', 'N/A', 'TV Show', '2020-01-01', NULL, 'N/A'); -- item_id = 12
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Heartland of Darkness', 'Single father Paul Henson purchases a newspaper in the small town of Copperton, Ohio and moves there with his teenage daughter Christina. The two soon come to realize the townsfolk, led by the evil Reverend Donovan, are actually S...', 'Movie', '2022-11-22', NULL, 'https://m.media-amazon.com/images/M/MV5BYzYzNzI2YTctYWNhZC00Y2EzLWFmMTUtNDFiZmY5NTQ1ZGZlXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 13
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Superboy & Supergirl & 7 Monster', 'N/A', 'Movie', '2022-03-12', NULL, 'N/A'); -- item_id = 14
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Perfect Shadow', 'N/A', 'Movie', '2024-01-01', NULL, 'N/A'); -- item_id = 15
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Black Star: Autobiography of a Close Friend', 'Prequel to Tom Joslin''s 1993 AIDS video diary SILVERLAKE LIFE: The View From Here. Mark and Tom in happier times. A mixed-genre experimental documentary about coming out of the closet in the early years of the gay liberation movem...', 'Movie', '2022-10-28', NULL, 'N/A'); -- item_id = 16
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Noticiero 24 horas', 'N/A', 'TV Show', '2020-01-01', NULL, 'N/A'); -- item_id = 17
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('In the Land of the Blind', 'N/A', 'Movie', '2024-01-01', NULL, 'N/A'); -- item_id = 18
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Mugen ryûkyû tsuru Henrî', 'This road film revolves around an Okinawan folk song singer Tsuru and her son Henry''s filmmaking journey. Taiwanese singers CHIN Man-wang, LEE Ping-huei, and acclaimed actress CHEN Shiang-chyi all make cameo appearances. After dec...', 'Movie', '2021-05-03', NULL, 'https://m.media-amazon.com/images/M/MV5BOWZlMmY5NzgtODQ0Yi00NTFmLTgwNzgtY2I5YjU5NjJiZGYzXkEyXkFqcGdeQXVyNDUxNjc5NjY@._V1_SX300.jpg'); -- item_id = 19
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Radha Krishna', 'N/A', 'Movie', '2020-01-01', NULL, 'N/A'); -- item_id = 20
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Incredible Shrinking Man', 'N/A', 'Movie', '2025-01-01', NULL, 'N/A'); -- item_id = 21
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('A Praga', 'While out for a walk in the countryside, Marina and Juvenal stop to take some pictures in front of an old woman''s house. Annoyed, the old woman turns out to be a witch and casts a curse on the young couple.', 'Movie', '2021-10-15', NULL, 'https://m.media-amazon.com/images/M/MV5BNjA0MmE1MzYtNjE3OC00MTgzLTk5OWEtYzNkZGVjMTc0NzQyXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 22
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Taniec trzcin', 'N/A', 'Movie', '2023-01-01', NULL, 'N/A'); -- item_id = 23
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Big Brother', 'The Portuguese version of the hit reality TV show. A group of people from a variety of backgrounds are locked in the same house, where they must try to get along well enough to keep from killing each other. The house has been wire...', 'TV Show', '2020-01-01', NULL, 'https://m.media-amazon.com/images/M/MV5BZTI3ZGEyYjgtOGRkYS00YzQ3LTg0ZDktYWE2NmJlZTJhOTUxXkEyXkFqcGdeQXVyNDg5MjMyMTM@._V1_SX300.jpg'); -- item_id = 24
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Gernstl unterwegs', 'N/A', 'TV Show', '2022-01-01', NULL, 'N/A'); -- item_id = 25
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Universal Groove', 'A quick trip through the underground party scene as seen through the memories of eight people coming back to reality.', 'Movie', '2007-12-01', NULL, 'https://m.media-amazon.com/images/M/MV5BMjE1NTQ5OTk3NF5BMl5BanBnXkFtZTcwMjQxNjE0MQ@@._V1_SX300.jpg'); -- item_id = 26
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Mortal Kombat', 'MMA fighter Cole Young seeks out Earth''s greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.', 'Movie', '2021-04-23', NULL, 'https://m.media-amazon.com/images/M/MV5BNmRmN2I5M2EtNDA1Ny00N2ZmLWE3YWYtMjQ1NTFjY2Q4NWM5XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 27
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Pit Bull: A Tale of Lust, Murder and Revenge', 'A lonely ranch-owner is pushed to his limits when two sleazy land developers attempt to trick and abuse him into selling his property.', 'Movie', '2020-01-01', NULL, 'https://m.media-amazon.com/images/M/MV5BOTdjOGViMjUtYWE0MS00NDQzLTlmZWQtNjQyMThhMjMwMTI1XkEyXkFqcGdeQXVyNjg5ODE0MDQ@._V1_SX300.jpg'); -- item_id = 28
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Norge i dag', 'A live current affairs program with reports and guests from all over the country.', 'TV Show', '2020-01-01', NULL, 'https://m.media-amazon.com/images/M/MV5BMDc1YWE1MjEtODZlMC00MGU1LTk0ZTMtMWZjNDU1ZDJiYjAxXkEyXkFqcGdeQXVyMTA1Mzk1NDMy._V1_SX300.jpg'); -- item_id = 29
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Badalte Rishte', 'Badalte Rishte is a story of changing fortunes. How dramatically and with what consequences the changes are brought about in the human psyche, personality, behaviour and relationships. ...', 'TV Show', '2021-01-01', NULL, 'N/A'); -- item_id = 30
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Iowa Press', 'N/A', 'TV Show', '2020-01-01', NULL, 'N/A'); -- item_id = 31
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Killer''s Game', 'When a hitman is diagnosed with a terminal illness, he decides to take a hit out on himself. But when the very hitmen he hired also target his ex-girlfriend, he must fend off an army of assassin colleagues.', 'Movie', '2024-09-13', NULL, 'https://m.media-amazon.com/images/M/MV5BODg4MTBiOGQtN2I5Yi00MWY2LWI1ODktZTUzZjhlYmZjMjFkXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 32
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Zamaanat: And Justice for All', 'A unfulfilled love story of a prominent lawyer, ''Shiv Shankar'' who loses his vision in an accident and is thrown into a life of seclusion. He also loses contact with his beloved (Vijayshanti) a doctor by profession. Shiv starts le...', 'Movie', '2025-01-01', NULL, 'https://m.media-amazon.com/images/M/MV5BMTgwNzI1NjE2MV5BMl5BanBnXkFtZTcwNzg5OTQxMg@@._V1_SX300.jpg'); -- item_id = 33
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('I giganti del cielo', 'N/A', 'Movie', '2024-01-01', NULL, 'N/A'); -- item_id = 34
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Sanatta: The Silence', 'N/A', 'Movie', '2025-01-01', NULL, 'N/A'); -- item_id = 35
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Yerkir Nairi', 'The film is dedicated to the 10th anniversary of the Soviet rule in Armenia.', 'Movie', '2023-01-01', NULL, 'N/A'); -- item_id = 36
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Perfumed Road', 'Every fragrance a woman wears is composed of two main ingredients. A scent, and ... passion.', 'Movie', '2024-01-01', NULL, 'N/A'); -- item_id = 37
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Remedy', 'A NYC artist is witness to his best friend''s murder - or was he? Due to a drug problem, he can''t recall what happened. Now he is the prime suspect and desperately tries to remember before it''s too late.', 'Movie', '2005-03-29', NULL, 'https://m.media-amazon.com/images/M/MV5BMTYyNDA5ODEzM15BMl5BanBnXkFtZTcwNDEwOTcyMQ@@._V1_SX300.jpg'); -- item_id = 38
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Mangalyam', 'N/A', 'TV Show', '2023-09-06', NULL, 'N/A'); -- item_id = 39
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Masters of the Universe', 'A young man on Earth discovers a fabulous secret legacy as the prince of an alien planet, and must recover a magic sword and return home to protect his kingdom.', 'Movie', '2026-06-05', NULL, 'https://m.media-amazon.com/images/M/MV5BNWE0MDE0NTctNTQ3Zi00ZjJiLTllYzgtZjA2NDg2OGRiZWZlXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 40
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Shantaram', 'Lindsay arrives in Mumbai after escaping from an Australian prison. He meets Prabhakar who takes him to his native village where he relaunches his criminal career as Shantaram in the city''s notorious underworld.', 'TV Show', '2022-10-14', NULL, 'https://m.media-amazon.com/images/M/MV5BNzdlODA5MWEtOTM3MC00NjZkLTk2MjItMzExZTk1NjUxZGViXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 41
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('About Face: The Story of the Jewish Refugee Soldiers of World War II', 'Documents the as-yet-untold World War II story of young Jewish men who escaped certain danger at the hands of the Nazis and returned to fight them in Europe and North Africa. Told through the eyes of these men, the film chronicles...', 'Movie', '2020-06-26', NULL, 'https://m.media-amazon.com/images/M/MV5BOTkwNzI5ZDctYjVjYi00Y2U1LWI1M2UtYjFhNmQ3MWE0ODgwXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 42
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Flash', 'Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes, forcing him to race for his life in order to save the future.', 'Movie', '2023-06-16', NULL, 'https://m.media-amazon.com/images/M/MV5BYmE2NzBjNGUtNTJiMy00N2UxLWEyYzMtYzFjODFhMGZlOTgzXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 43
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Surviving in L.A.', 'Kate McCarthy, a former teen sitcom star who trashed her life through drug abuse, is forced to live, fresh out of rehab, on the one remaining piece of property, her business manager, Charlie has kept out of foreclosure - a run-dow...', 'Movie', '2020-08-15', NULL, 'https://m.media-amazon.com/images/M/MV5BODg3MDg1Mzg3OF5BMl5BanBnXkFtZTcwODQ0OTExOQ@@._V1_SX300.jpg'); -- item_id = 44
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Nefarious', 'A fast moving, funny and ultimately tragic European road movie about two hedonistic outlaws and their quest to open up a coffeeshop in Amsterdam.', 'Movie', '2024-01-01', NULL, 'https://m.media-amazon.com/images/M/MV5BNzVkYWQ1ZGQtNmEyZC00N2VjLTgxNzQtNDI2MDBmZDlhZGRlXkEyXkFqcGdeQXVyNTg0MzE1MjQ@._V1_SX300.jpg'); -- item_id = 45
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('On Moral Grounds', 'Shot on location in Eastern Europe and in the courtrooms of the United States, this documentary brings to light the saga of WWII restitution and the stories of those who have sought justice...', 'Movie', '2006-04-02', NULL, 'N/A'); -- item_id = 46
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Ten Tricks', 'In one night, a madam at a brothel makes plans to get pregnant, while a magician working across the street makes a drastic move to change his life.', 'Movie', '2022-09-27', NULL, 'https://m.media-amazon.com/images/M/MV5BMWY0NGUyZDktZWQ2ZS00ZGRiLTlmMTctMzAyOTFiOWE5ZDAxXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 47
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Anywhere Anytime', 'A marriage is about to become bait to the tabloid gossip of Bollywood''s hot on-screen pair, Shekahar (Aashish Chowdhary) and Jaya (Sheetal Malhar). Thus further agitating the already ...', 'Movie', '2025-01-01', NULL, 'N/A'); -- item_id = 48
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Soccer Academy', '"The Soccer Academy" is a recurring television series presently distributed throughout North Africa, The Middle East and the Near East. It is a soccer, travel, adventure and culture show ...', 'TV Show', '2022-01-01', NULL, 'N/A'); -- item_id = 49
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Twits', 'A pair of wicked pranksters plan an elaborate heist along with their crew of highly-trained animals.', 'Movie', '2025-06-13', NULL, 'https://m.media-amazon.com/images/M/MV5BNDAyNWJlZDEtZWYyOS00ZmVjLWI0MTAtMDc5MGZjNWRkOTViXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_SX300.jpg'); -- item_id = 50
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Without Remorse', 'An elite Navy SEAL goes on a path to avenge his wife''s murder only to find himself inside of a larger conspiracy.', 'Movie', '2021-04-30', NULL, 'https://m.media-amazon.com/images/M/MV5BNzE0NjU1MmUtZWUzMS00ZWRiLWE5ZjYtODk3NmRlMmExYWI1XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 51
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Moe', 'A fun-loving Latino theater director lives his remaining days to the fullest as he suffers from AIDS.', 'Movie', '2008-12-01', NULL, 'N/A'); -- item_id = 52
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('American Surfrider', 'Society needs a reboot after the devastating activities of 2020. Some of post-pandemic society will need ways to improve their mental health and this project serves as a soulful reminder of how some people found their happiness or...', 'Movie', '2008-05-20', NULL, 'N/A'); -- item_id = 53
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Vendetta', 'Madera Verde is cerebrating its bicentennial when a killer wreaks havoc on the town. Now two sisters with a tragic past are next.', 'Movie', '2022-04-01', NULL, 'https://m.media-amazon.com/images/M/MV5BNDg4OTVkZTMtZWU1OS00YTQxLTg2ZjUtNzVkYjg5NDczNzVmXkEyXkFqcGdeQXVyMjAxNDQ1ODc@._V1_SX300.jpg'); -- item_id = 54
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Un homme à femmes', 'N/A', 'Movie', '2024-01-01', NULL, 'N/A'); -- item_id = 55
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Foundation', 'A complex saga of humans scattered on planets throughout the galaxy all living under the rule of the Galactic Empire.', 'TV Show', '2021-09-24', NULL, 'https://m.media-amazon.com/images/M/MV5BOTRiNGMxOGMtMTQ5Ni00OGVjLWE3YWEtZDNhYzlmMjc2ZWUwXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 56
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Witches', 'A young boy and his grandmother have a run-in with a coven of witches and their leader.', 'Movie', '2020-10-22', NULL, 'https://m.media-amazon.com/images/M/MV5BZjRiYWFmZTYtYTBmZi00ZmM0LWFjODgtNWZmNjQyYjQ5OTRkXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 57
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Swarm', 'Ecological thriller about the delicate interconnectedness between mankind and Earth.', 'TV Show', '2023-09-12', NULL, 'https://m.media-amazon.com/images/M/MV5BMGQzZjZlNjctMTZhMy00Njg3LWIyNzAtODEyZTFhNGRkMjUwXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 58
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Jungle Cruise', 'Based on Disneyland''s theme park ride where a small riverboat takes a group of travelers through a jungle filled with dangerous animals and reptiles but with a supernatural element.', 'Movie', '2021-07-30', NULL, 'https://m.media-amazon.com/images/M/MV5BMWU5ZTBkMjQtMzg2Yi00ZmJlLTk4YWEtYTc0ZjU1YzE1NGNkXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 59
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Rain Falls from Earth: Surviving Cambodia''s Darkest Hour', 'On April 17, 1975, the face of Cambodia would forever be changed. As Khmer Rouge soldiers marched into the capital city of Phnom Penh, the unsuspecting people of Cambodia had little idea they would be forced into a living nightmar...', 'Movie', '2011-11-30', NULL, 'https://m.media-amazon.com/images/M/MV5BMTMxOTc5MzI4Ml5BMl5BanBnXkFtZTcwMTYwMTM3Mg@@._V1_SX300.jpg'); -- item_id = 60
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Hellraiser', 'A young woman struggling with addiction comes into possession of an ancient puzzle box, unaware that its purpose is to summon the Cenobites.', 'Movie', '2022-10-07', NULL, 'https://m.media-amazon.com/images/M/MV5BNWZkZTU0YzItM2YyZi00NzdiLWEwYWMtZjJhMTFjYmVmYWE1XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 61
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Amateur', 'A CIA cryptographer manages to blackmail his agency into training him to let him go after a group of terrorists who killed his wife.', 'Movie', '2025-04-11', NULL, 'https://m.media-amazon.com/images/M/MV5BOWU4NjNjNzYtYWFhYy00MTA2LWIwNzctNmQwY2VlMzQ3MTZmXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 62
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Invasion of the Not Quite Dead', 'Sam Peterson returns home after 15 years to find all is not ''WELL'' nor what it seems in his home town.', 'Movie', '2022-10-31', NULL, 'https://m.media-amazon.com/images/M/MV5BYzhkY2NhMTctODA4Yi00Y2YyLWIyN2UtNzhiOWI4YzNmOGYxXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 63
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Lost Girls and Love Hotels', 'Disillusioned with the world she knows, a woman searches for meaning and affirmations of life with a dashing Yakuza gangster in Tokyo.', 'Movie', '2020-09-18', NULL, 'https://m.media-amazon.com/images/M/MV5BY2YzZjg3YzQtNGY1MS00Mjk5LTg1ZGYtMTAzOGU4MmJiOTA2XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 64
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Jaane Bhi Do Yaaron', 'Jaane Bhi Do Yaaro is a dark satire on the rampant corruption in Indian politics, bureaucracy, news media and business.', 'Movie', '2007-12-28', NULL, 'https://m.media-amazon.com/images/M/MV5BMDE0Y2NhYjEtNWM3MS00MzFiLTlkODctYmViY2Q4OTczYWI2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg'); -- item_id = 65
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Fantasy Island', 'When the owner and operator of a luxurious island invites a collection of guests to live out their most elaborate fantasies in relative seclusion, chaos quickly descends.', 'Movie', '2020-02-14', NULL, 'https://m.media-amazon.com/images/M/MV5BMjhiNGM2NGQtNDlkNi00NTg4LWFlNTctMTE0ODNlOWY3NWI5XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 66
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Army of the Dead', 'Following a zombie outbreak in Las Vegas, a group of mercenaries take the ultimate gamble, venturing into the quarantine zone to pull off the greatest heist ever attempted.', 'Movie', '2021-05-21', NULL, 'https://m.media-amazon.com/images/M/MV5BNjc0MDFjZmQtMWMxZi00YzY4LWI5N2EtOGQwM2IzZjRkYmY1XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 67
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('A Journal for Jordan', '1st Sgt. Charles Monroe King, before he is killed in action in Baghdad, authors a journal for his son intended to tell him how to live a decent life despite growing up without a father.', 'Movie', '2021-12-25', NULL, 'https://m.media-amazon.com/images/M/MV5BOTUyNjQ0ZjEtMGE3My00MTNkLTljYmYtNDFhN2Y3ZWViNzM5XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 68
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Rental', 'Two couples rent a vacation home for what should be a celebratory weekend get-away.', 'Movie', '2020-07-24', NULL, 'https://m.media-amazon.com/images/M/MV5BMGM0MGNiNzUtNDI4MS00ZmU1LWE4ZWMtYTg2MDJiNTBiYTRlXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 69
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Metamorphosis of Ismaila Ba', 'The Metamorphosis of Ismaila Ba is the story of two women who meet in a cafe. There is an undeniable attraction, even as each of them sees the depth of the other''s pain. Things immediately get complicated when they are brutally at...', 'Movie', '2020-01-07', NULL, 'https://m.media-amazon.com/images/M/MV5BZjNmZWZjZTgtNzM5Ni00NGFlLWI0M2ItNmE1MGI0MmY0ZDViXkEyXkFqcGdeQXVyNTYyNjAyNA@@._V1_SX300.jpg'); -- item_id = 70
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Celts', 'Winter, 1993. Bill Clinton is elected president. Audrey Hepburn dies. Wars following the breakup of socialist Yugoslavia are continued in Croatia and Bosnia. Belgrade is under sanctions and inflation that threaten to become hyperi...', 'Movie', '2021-12-02', NULL, 'https://m.media-amazon.com/images/M/MV5BYTI1YjViZmItMmM2Yy00ZjE4LWEwM2MtNDYyNGRmOGFmY2FhXkEyXkFqcGdeQXVyMTI0Nzk5NTQ2._V1_SX300.jpg'); -- item_id = 71
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Seeds', 'A grieving mother holds onto her Catholic faith as her husband leaves to study and learn the secrets of an old New England cult. Secrets that the Catholic Church wants for their own use. Meanwhile the cult has deadly plans of thei...', 'Movie', '2020-08-30', NULL, 'https://m.media-amazon.com/images/M/MV5BMjQyNDc3MDMtNWQyYS00M2E4LWFhZWEtNDcyZDQ0YTM0NTk5XkEyXkFqcGdeQXVyMjM2MDk1NzM@._V1_SX300.jpg'); -- item_id = 72
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Transe', 'A threesome that takes place against the backdrop of Brazil''s 2018 presidential election. Three young adults in a love triangle seek to understand the world and who they are on the brink of a shocking and highly-divisive election ...', 'Movie', '2022-10-08', NULL, 'https://m.media-amazon.com/images/M/MV5BNDhiNTUyMzktNjE1OS00YWVhLWE3MjAtZGFmMmM2YTNkZDJlXkEyXkFqcGdeQXVyMTkwOTIzMzg@._V1_SX300.jpg'); -- item_id = 73
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Sacrifice', 'After his mother''s death, Isaac and pregnant wife visit his Norwegian island birthplace for an inheritance. They uncover Isaac''s dark past secrets. Their trip turns nightmarish when they encounter a cult worshipping a sea deity.', 'Movie', '2021-02-09', NULL, 'https://m.media-amazon.com/images/M/MV5BOTQzMTg2NmYtOTUyYy00OWY3LWEyNDItMWZiNzY4MzNiNDVkXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 74
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('I Never Cry', 'Ola, a seventeen-year-old, sets off to a foreign country on her own. It turns out to be the trip of her lifetime, where she tries to reconnect with her estranged father, comes to know a different world and changes her approach to ...', 'Movie', '2020-09-25', NULL, 'https://m.media-amazon.com/images/M/MV5BYmQzZTQ3YTItOGY3OC00YWE3LWI3NGUtNTI1OWNlZTRjOGZkXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 75
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Neil', 'Set in a tough city in the world of film-noir, a hapless and meek young loner is misguided down a tragic path when he is deceived into seeking an urn for his recently deceased dog.', 'Movie', '2023-05-18', NULL, 'https://m.media-amazon.com/images/M/MV5BMzljYTRhYTktMmExMy00MjYxLWIyZjAtNGI0YTc3NjRkMTVkXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 76
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('A Small Problem', 'M.J. tell the story about K.C.''s unbearable grandparents. During all of the chaos in their lives, K.C. and M.J. finds crystals that changes their lives forever.', 'Movie', '2023-11-24', NULL, 'https://m.media-amazon.com/images/M/MV5BMjEwNWUyNjEtYmQxOC00ZTAxLWIyZGYtMzM2YmYwZTk2MzgwXkEyXkFqcGdeQXVyODM1MTk4OTc@._V1_SX300.jpg'); -- item_id = 77
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Chinese Speaking Vampires', 'A desperate actor becomes a vampire and uses his new powers to land a movie role and the girl, but then must choose between life and the undead.', 'Movie', '2021-05-04', NULL, 'https://m.media-amazon.com/images/M/MV5BOTMyZmM0NzQtMzFjMi00MTY2LWIwYzAtODNiMzFjMmEzMDYzXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 78
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Aguanta', 'A year in the life of Israel, a high-school senior who''s life becomes unbearable after his father is deported, all while trying to restore his faith.', 'Movie', '2022-01-06', NULL, 'https://m.media-amazon.com/images/M/MV5BMjU3ZGFkMmItZmE5Yy00OGExLWIzNjQtYzM0YTlhYzQwMTZkXkEyXkFqcGdeQXVyMTAxNjA5MDA2._V1_SX300.jpg'); -- item_id = 79
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Thanks a Million', 'Celebrities kickstart a chain of kindness by gifting $100,000 to an unsuspecting individual who must then pay it forward.', 'TV Show', '2020-04-06', NULL, 'https://m.media-amazon.com/images/M/MV5BYjQ1YmIyNjUtZDgxNy00MDhlLTk2YzItOTJiMWRiODA2YjIwXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 80
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Kala azar', 'In a big city somewhere in the south of Europe, a couple takes care of dead animals and abandoned roadkill as an act to give meaning to their life. Kala azar is a meditation on the paradox of life-circles among beings of different...', 'Movie', '2021-06-02', NULL, 'https://m.media-amazon.com/images/M/MV5BMTExOGM1NjgtNjdhZS00Nzc2LWFhMDItM2U2M2NjNDQ5NmZkXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 81
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Avocado Toast the Series', 'Avocado Toast is an intergenerational sex comedy exploring the comforts and awkwardness of sex from age 25 to 69. When it comes to millennials and baby boomers, these nuts haven''t fallen so far from the family tree.', 'TV Show', '2020-05-18', NULL, 'https://m.media-amazon.com/images/M/MV5BMjVmMjFmZTctOTUxZS00MGFkLTliOTAtMzRjNTM5MDc1Mjc0XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 82
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('''Ruguo suiyue ke huitou''', 'N/A', 'TV Show', '2020-03-20', NULL, 'https://m.media-amazon.com/images/M/MV5BZDlkODVkZTUtZDU4YS00NDQ1LWI5YjYtNTA3M2RmOTNiMDdlXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 83
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Blood of Zeus', 'A commoner living in ancient Greece, Heron discovers his true heritage as a son of Zeus, and his purpose: to save the world from a demonic army.', 'TV Show', '2020-10-27', NULL, 'https://m.media-amazon.com/images/M/MV5BMjM0ZDcwMTQtZGQxNS00MjBiLTk5ZGUtZGNhOGU1YzdmMWYyXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 84
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Maybe It''s True What They Say About Us', 'A mother tries to find out what what happened to her estranged daughter''s child after she says it was sacrificed to a religious sect.', 'Movie', '2024-06-07', NULL, 'https://m.media-amazon.com/images/M/MV5BMDE1YTRhNjEtOWUxMS00ZTNkLTg1ZWEtYTA5ODk5MDlkMzUyXkEyXkFqcGdeQXVyODYzMTEyNzg@._V1_SX300.jpg'); -- item_id = 85
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('F-Word', 'N/A', 'Movie', '2021-03-20', NULL, 'https://m.media-amazon.com/images/M/MV5BZjhmMWIwNmUtYTZlMy00MjdhLTk4ZjQtN2RkODQwOGNmZGIwXkEyXkFqcGdeQXVyMjM2NzQxODY@._V1_SX300.jpg'); -- item_id = 86
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The 10th Man', 'The Story of Bill Welch, Writer of The 10th Man.', 'Movie', '2021-07-01', NULL, 'https://m.media-amazon.com/images/M/MV5BOWEzNGJhOWItMWNlMi00ZTgwLWI3OTctZmY5MDNkNWVmMjRkXkEyXkFqcGdeQXVyMjMxMDQ5NTE@._V1_SX300.jpg'); -- item_id = 87
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Preman', 'After his son witnesses a brutal murder by a notorious crime boss, a deaf Indonesian gangster is thrust into the fight of his life when he takes on his dangerous former allies, including a sociopath assassin, in order to protect h...', 'Movie', '2022-09-27', NULL, 'https://m.media-amazon.com/images/M/MV5BNTc1ZDJiMTYtY2VkNy00NzY1LWE0YTEtNjdhZTM5MWE1Y2ZiXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 88
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Hunted', '"The company of wolves is better than that of man." Once upon a frenzied time, Woman meets Man. Woman dances with Man. Man kisses Woman. Man grips Woman. Woman escapes Man. Man chases Woman - nothing new. Or is there?', 'Movie', '2021-01-14', NULL, 'https://m.media-amazon.com/images/M/MV5BM2ExMmY0N2EtYmY1Mi00ZTkzLThhZGMtMThjZDQ1YTkxMThkXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 89
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Cinematti - Una storia folle', 'N/A', 'Movie', '2020-11-29', NULL, 'https://m.media-amazon.com/images/M/MV5BNDJlNDFhZGEtNjA5NC00MmE2LTgyMmMtMmZjNzcyYTA5NTdlXkEyXkFqcGdeQXVyMDc5NzY2OQ@@._V1_SX300.jpg'); -- item_id = 90
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Dragon''s Dogma', 'Ethan sets out to vanquish the Dragon that took his heart, but with every demon he battles, he loses more of his humanity.', 'TV Show', '2020-09-17', NULL, 'https://m.media-amazon.com/images/M/MV5BNjJlYTllODktMzExZC00ZjIxLWFkNjQtMTFmY2Q2NTE5M2U4XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 91
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Darkness', 'A dedicated investigator, she is being forced into early retirement and takes on a final cold case centered on a young Russian asylum seeker who died mysteriously one year prior.', 'TV Show', '2024-09-11', NULL, 'https://m.media-amazon.com/images/M/MV5BZGI3NzkxN2MtZDMxOC00YzgwLWEyNTUtZmMwN2YzM2YzYTI4XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 92
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Quase Alguém', 'Gilda Borba, the famous actress tries after many mistakes in her career, perform the best role of her life, to be a good mother.', 'Movie', '2023-09-11', NULL, 'https://m.media-amazon.com/images/M/MV5BZjNlNTczMTEtZjIxMy00MDRiLWExOGEtNTA0NGViNTdmNTgxXkEyXkFqcGdeQXVyMDk5MTQ2OQ@@._V1_SX300.jpg'); -- item_id = 93
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Killer Babes and the Frightening Film Fiasco', 'A wild party becomes an act of survival as a group of savage females ensue a brutal killing spree in this shocking film frenzy.', 'Movie', '2020-10-20', NULL, 'https://m.media-amazon.com/images/M/MV5BZTQxZmI2YTQtM2Y2ZC00NTgzLWE1ZTYtZGM4YTg2YmI5OTY2XkEyXkFqcGdeQXVyMjM0OTQxMTA@._V1_SX300.jpg'); -- item_id = 94
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Uljanenko uncensored', 'A documentary feature film about Oles Uljanenko, an author and cult figure of Ukrainian post-Soviet culture. His works were banned by Ukrainian authorities having judged them as pornographic and should be destroyed.', 'Movie', '2021-06-24', NULL, 'https://m.media-amazon.com/images/M/MV5BZmUzYjNhYzAtMDE5Zi00Zjk5LWIyZjUtNzU2N2VjMzUzMjAwXkEyXkFqcGdeQXVyMjU4MTk3NDU@._V1_SX300.jpg'); -- item_id = 95
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Problem with People', 'Two estranged cousins who never knew each other try to make amends for many generations of family dispute.', 'Movie', '2024-10-04', NULL, 'https://m.media-amazon.com/images/M/MV5BYmUyMDE1NGYtNDA1OS00Y2NlLTgwZjQtYTk0OGUzZTg3NGQ5XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 96
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('September', 'Theater and film actor, Mykola Veresen'' dies on the set while performing the role of Ivan the Terrible. In the moment of death, his karma transforms into the bloody murderer he embodied, and he falls into Sheol, a common grave for...', 'Movie', '2023-08-10', NULL, 'https://m.media-amazon.com/images/M/MV5BODA0MGZjN2QtZTQ1MS00NzBjLTk3M2YtMmYyNzhjNWJiZDdmXkEyXkFqcGdeQXVyMjU4MTk3NDU@._V1_SX300.jpg'); -- item_id = 97
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Sirens', 'Lilas and Shery, co-founders and guitarists of the Middle East''s first all-female metal band, wrestle with friendship, sexuality and destruction in their pursuit of becoming thrash metal rock stars.', 'Movie', '2023-01-16', NULL, 'https://m.media-amazon.com/images/M/MV5BOGM3NGQ5NDktYWJlYy00ZmI5LWFhZTQtZTYxMjExNDQ5Nzk0XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 98
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Ancestral Waters', 'Documenting the Puyallup Tribes fight for their treaty, their water and their way of life. We follow tribal members as they work to stop a dangerous fracked gas processing facility on protected treaty territory.', 'Movie', '2022-09-23', NULL, 'https://m.media-amazon.com/images/M/MV5BMzYzYzhjZDEtMTBmMS00M2VlLTlkNGItYWZhNTI0NjkyM2VjXkEyXkFqcGdeQXVyMTAwMzgzODg3._V1_SX300.jpg'); -- item_id = 99
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Last Voyage of the Demeter', 'A crew sailing from Varna (Bulgaria) by the Black Sea to England find that they are carrying very dangerous cargo.', 'Movie', '2023-08-11', NULL, 'https://m.media-amazon.com/images/M/MV5BZmRkMTFjNWMtNTVhNS00Y2EwLWJjYTAtMDRiMjA2MDJhOGI1XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 100
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Ash and Bone', 'Cassie is a rebelling teen and with a new stepmom it escalates and her father Lucas decides to take her and his new wife Sarah out of the city for some bonding and quality time together. What they find instead is the McKinley''s an...', 'Movie', '2022-10-04', NULL, 'https://m.media-amazon.com/images/M/MV5BMTJkNDc0YTMtMmI3ZS00YTZhLThmOWYtNGU3NjQzODFkODU4XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 101
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Big 3', 'Liquor House Comedy presents the Big 3 featuring stand up comedians Brian Isley (New York''s Apollo Theater) Bo Alambis and Ampston Hews. None of these three comedians are a like. They all ...', 'Movie', '2020-04-24', NULL, 'https://m.media-amazon.com/images/M/MV5BOGRiNDJjZmEtZmNiNy00ZDViLTg1ZTQtOTlkNDU4OTEyNzFkXkEyXkFqcGdeQXVyMTU4ODk2OTQ@._V1_SX300.jpg'); -- item_id = 102
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Mr Nelson on the North Side', 'Music icons including Chuck D, Orianthi, and Chaka Khan recount never-before-told stories of Prince the performer and Prince the man, and how his unique creativity, in turn, inspired them to do their best work.', 'Movie', '2021-04-24', NULL, 'https://m.media-amazon.com/images/M/MV5BYmE0YTlmNWQtNTU4NC00MWRjLWJmMDItN2M2YTg5NzBjNmJjXkEyXkFqcGdeQXVyMjg2Mzc3Mw@@._V1_SX300.jpg'); -- item_id = 103
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Little Things', 'Kern County Deputy Sheriff Joe Deacon is sent to Los Angeles for what should have been a quick evidence-gathering assignment. Instead, he becomes embroiled in the search for a serial killer who is terrorizing the city.', 'Movie', '2021-01-29', NULL, 'https://m.media-amazon.com/images/M/MV5BZmRjYmQ5Y2YtYTUyMy00OTg0LWE1YmEtZTI2NDYxYTBhYTYxXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 104
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Willie Lynch', 'Traps are all around Jay, a young man who is enslaved by the Willie Lynch system. A system that destroys his self-worth, and he will do anything to regain it, but there is a way out.', 'Movie', '2021-09-09', NULL, 'N/A'); -- item_id = 105

-- ContentItemGenre Inserts
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (6, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (7, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (7, 5);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (7, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (8, 7);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (9, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (10, 8);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (10, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (11, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (11, 9);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (12, 7);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (13, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (14, 7);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (15, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (16, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (17, 10);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (18, 7);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (19, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (19, 9);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (20, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (21, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (21, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (21, 13);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (22, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (22, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (23, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (24, 14);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (24, 15);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (25, 7);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (26, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (26, 9);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (27, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (27, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (27, 9);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (28, 7);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (29, 10);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (30, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (31, 10);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (31, 17);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (32, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (32, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (32, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (33, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (33, 18);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (33, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (34, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (35, 7);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (36, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (37, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (38, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (38, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (39, 7);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (40, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (40, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (40, 18);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (41, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (41, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (41, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (42, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (43, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (43, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (43, 9);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (44, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (44, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (44, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (45, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (45, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (46, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (46, 2);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (46, 22);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (47, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (47, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (48, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (48, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (48, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (49, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (49, 18);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (49, 17);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (50, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (50, 23);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (50, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (51, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (51, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (51, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (52, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (52, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (52, 24);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (53, 7);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (54, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (54, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (54, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (55, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (56, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (56, 13);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (57, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (57, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (57, 18);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (58, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (58, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (58, 13);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (59, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (59, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (59, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (60, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (61, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (61, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (61, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (62, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (62, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (63, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (63, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (63, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (64, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (64, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (65, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (65, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (66, 9);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (66, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (66, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (67, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (67, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (67, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (68, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (68, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (68, 22);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (69, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (69, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (69, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (70, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (70, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (71, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (72, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (73, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (74, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (74, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (74, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (75, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (75, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (76, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (76, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (76, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (77, 7);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (78, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (78, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (79, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (80, 15);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (80, 25);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (81, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (81, 9);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (82, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (82, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (82, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (83, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (84, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (84, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (84, 23);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (85, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (85, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (86, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (87, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (88, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (88, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (88, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (89, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (89, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (89, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (90, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (91, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (91, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (91, 23);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (92, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (93, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (94, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (95, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (96, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (97, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (98, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (98, 5);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (99, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (100, 9);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (100, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (100, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (101, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (101, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (101, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (102, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (102, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (103, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (104, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (104, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (104, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (105, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (105, 6);