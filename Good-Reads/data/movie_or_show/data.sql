
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

-- ContentItem Inserts
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Knots: A Forced Marriage Story', 'Explore the sinister truth about forced and child marriage in the United States through the harrowing experiences of those who have survived it.', 'Movie', '2020-03-14', NULL, 'https://m.media-amazon.com/images/M/MV5BOWZkNzBkZWQtYmU4MC00YmUzLTk5MjMtN2RhYTE0MmM1ZTE4XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg'); -- item_id = 299
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Orphan Black: Echoes', 'Follows a group of women as they weave their way into each other''s lives and embark on a thrilling journey, unravelling the mystery of their identity.', 'TV Show', '2024-06-23', NULL, 'https://m.media-amazon.com/images/M/MV5BZWQ2MGE4NGYtNTZiMS00ZjY0LThmNWYtOGU1ZjcxMGE3YjJkXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 300
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Villa Caprice', 'Famous lawyer, Luc Germon adds Gilles Fontaine, one of the most powerful bosses in France, to his clients. He is suspected of having acquired a magnificent property, Villa Caprice, under questionable conditions.', 'Movie', '2021-06-02', NULL, 'https://m.media-amazon.com/images/M/MV5BMTU4MzE3OWUtMThhMS00NjBmLWI0OWItNmEyMDc4YzI2NzQyXkEyXkFqcGdeQXVyMTUwOTU0Mw@@._V1_SX300.jpg'); -- item_id = 301
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Terminus', 'A Ghanaian chemist, who in a bid to vindicate his company in a lawsuit stumbles on something even more dangerous in the process - a hidden chemical formula altered for testing and profit gains by a pharmaceutical giant.', 'Movie', '2022-11-17', NULL, 'https://m.media-amazon.com/images/M/MV5BYzU0NDY0ZDgtYjIzMS00YTdkLTk2YmMtOGRkY2Q2ZjcyZmI3XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 302
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Flag', 'A look beyond complex relationship and various dimensions of contemporary Croatian identity. Questioning collective awareness of the understanding and meaning of the common identity of contemporary Croats.', 'Movie', '2022-05-10', NULL, 'https://m.media-amazon.com/images/M/MV5BMGRkYjcxNWUtNzY4Ny00MmEyLWI3ZTctMzBlMjYzNDhjNWU0XkEyXkFqcGdeQXVyNjA3NDk1OA@@._V1_SX300.jpg'); -- item_id = 303
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('A Deadly Legend', 'Joan Huntar, a real estate developer, buys an old summer camp. It turns out that the property was once inhabited by a rogue sect of pagans with a dark history of sacrificial worship. A celebration weekend with friends (and way too...', 'Movie', '2020-07-10', NULL, 'https://m.media-amazon.com/images/M/MV5BMmNmZmM3ZjYtN2ZmMC00NzhlLTg0MGQtYWI2ZjNlZGFmYWFlXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 304
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Howard''s Mill', 'An abandoned piece of farmland in rural Tennessee may hold the key to multiple missing person cases spanning over 40 years.', 'Movie', '2021-03-22', NULL, 'https://m.media-amazon.com/images/M/MV5BZTk5Y2ZkYWUtYWE3MS00MmJkLWEzMjgtMDUzMzY5YjNkMjM5XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 305
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Sweet Face', '....is a narrative that takes place over the life span of a married couple, their adorable love story starting from how they meet as youths, become friends, their courtship, their marriage and the difficulties they encounter.. the...', 'Movie', '2020-02-13', NULL, 'https://m.media-amazon.com/images/M/MV5BNzljZjE3MDctMzVhZS00YzU1LThlZTQtOTY0NDNlZDJmNTY4XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 306
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Everything I Ever Wanted to Tell My Daughter About Men', 'A woman tells her daughter about every man she''s ever been with - in the hope her daughter won''t make the same mistakes.', 'Movie', '2021-10-23', NULL, 'https://m.media-amazon.com/images/M/MV5BOTMzOTUxYjAtZDc4YS00NTFlLWIzOTYtNmMzY2ExMzUyOGNkXkEyXkFqcGdeQXVyNjkxNDExMjk@._V1_SX300.jpg'); -- item_id = 307
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Seeru', 'A guy from a small-town takes on a ruthless criminal lawyer for his friend and sister(s).', 'Movie', '2020-02-07', NULL, 'https://m.media-amazon.com/images/M/MV5BZmZmNDY2YWItMDY4Ny00NDJiLWI3ZjAtYzQyN2Q2YjIzNGExXkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_SX300.jpg'); -- item_id = 308
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Clean', 'Tormented by his past, a garbage man named Clean attempts a quiet life of redemption. But, soon finds himself forced to reconcile with the violence of his past.', 'Movie', '2022-01-28', NULL, 'https://m.media-amazon.com/images/M/MV5BZDQ2ZWIwY2EtNzNmZC00NWUxLWJjMjAtYjNlMDk0Y2MxZTJlXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 309
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Love Aaj Kal', 'When professional ambitions clash with personal feelings for a modern-day couple, a love story from a bygone era may offer some wisdom.', 'Movie', '2020-02-14', NULL, 'https://m.media-amazon.com/images/M/MV5BNDY1YmRkZWItZDgzOS00YzM5LWJmOGYtMDVlMzg2MjVkM2RlXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 310
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('My Cousin', 'The CEO of a big international wine company must meet again with his clumsy cousin to renew the contract allowing him to manage the brand, going down a rabbit hole of adventures and catastrophes in the process.', 'Movie', '2020-09-30', NULL, 'https://m.media-amazon.com/images/M/MV5BMjUwOTY0MjMtMGNhOC00OGE0LTgyZmQtOWFhMGE4OGQxMWZmXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 311
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Simple Passion', 'A mother falls into an addictive relationship with a Russian diplomat, with whom she has nothing in common.', 'Movie', '2022-01-21', NULL, 'https://m.media-amazon.com/images/M/MV5BZTI3NzExOWQtNzk4MS00YjU3LThhMjctNzliNDNhMjA2NjYzXkEyXkFqcGdeQXVyNTQwMDA5NTg@._V1_SX300.jpg'); -- item_id = 312
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Dog Thief', 'One shoe-shine, 13-year-old orphan Martin, comes to believe that a client, Mr Novoa, a solitary tailor, is his biological father.', 'Movie', '2024-06-06', NULL, 'https://m.media-amazon.com/images/M/MV5BNmIwYjQ1YjMtZDA5NS00YjQ0LWJhYzgtZTNkMzcwOThkYmY0XkEyXkFqcGdeQXVyODUyODQ1NA@@._V1_SX300.jpg'); -- item_id = 313
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Okavango: River of Dreams - Director''s Cut', 'Calling itself a love letter to the greatest river in Africa, Okavango: River of Dreams observes a unique ecosystem with a skilled and deeply perceptive eye.', 'Movie', '2020-01-26', NULL, 'https://m.media-amazon.com/images/M/MV5BYTQ0ODE4OTAtYTFhNS00YzA0LTk5MzItNzQ1ODk5OTI2YTI2XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 314
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Humans', 'During one evening, the Blake family gathers to celebrate Thanksgiving in a broken-down flat newly rented by the daughter and her new man. As the darkness falls, we find that all have less to be thankful about.', 'Movie', '2021-11-24', NULL, 'https://m.media-amazon.com/images/M/MV5BYTIxYTVmNzctNGQ1ZS00NDk2LTllMDYtMzQ4ZTNjODBiYmU4XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 315
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('That''s My Jam', 'In each episode, two teams of two celebrities compete in a series of music, dance, and trivia-based games and musical performances for a charity of their choice.', 'TV Show', '2021-11-29', NULL, 'https://m.media-amazon.com/images/M/MV5BNWQ0YjRiMzMtNTZmNC00NzE2LTkzM2QtNTEzODhkYjc3OTc3XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 316
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Bertha Lutz', 'Bertha Lutz - Women and the U.N Charter'' reveals the important and unknown role of a Brazilian biologist and feminist in ensuring that gender issues were addressed at the basis of the United Nations.', 'Movie', '2021-03-09', NULL, 'https://m.media-amazon.com/images/M/MV5BZmUyNDZiNWQtMWMyNC00OWFhLTg2NzctZTNhZjJmOWNhMDFlXkEyXkFqcGdeQXVyMjA1NTA1ODM@._V1_SX300.jpg'); -- item_id = 317
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Ringolevio', 'Ada, a reserved young woman with a passion for entomology, travels north to meet her girlfriend''s family, but struggles to find common ground.', 'Movie', '2020-11-13', NULL, 'https://m.media-amazon.com/images/M/MV5BM2JkYjg1YTYtYjg4Ni00ZmU5LTllMWMtOTJiY2ZmZjIzYjUxXkEyXkFqcGdeQXVyMTIzNTI5NTM1._V1_SX300.jpg'); -- item_id = 318
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Laal Singh Chaddha', 'The story of Laal Singh Chaddha, a simple man whose extraordinary journey will fill you with love, warmth and happiness.', 'Movie', '2022-08-11', NULL, 'https://m.media-amazon.com/images/M/MV5BMTM1ODNiMWItODk3YS00MGUwLTkxNTgtOGI0OGZmZTgwZDZhXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 319
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('List(e)n', 'We hate that which we don''t understand. Can we attempt to understand that which we hate?', 'Movie', '2020-03-08', NULL, 'N/A'); -- item_id = 320
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Witch Trilogy 15+', 'Having had enough, the witches are screaming wounds and healings out of prisons.', 'Movie', '2022-04-15', NULL, 'https://m.media-amazon.com/images/M/MV5BYzA4ZDllM2ItOTliYy00MDkzLThlMTgtNGFjNTdmMWIzZWEyXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 321
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Faces of Fear', 'A chilling omnibus of terror tales from the cutting edge of the horror underground, featuring short but devilishly sweet bites of blood-soaked stories.', 'Movie', '2020-09-29', NULL, 'https://m.media-amazon.com/images/M/MV5BOTMzYWJmNjQtNTRhOC00N2VmLTgyZGQtZTYzYWZjZGE0Yjg5XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 322
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Asia', 'Despite living together, Asia barely interacts with her daughter Vika. Their routine is shaken when Vika''s health deteriorates rapidly. Asia must step in and become the mother Vika so desperately needs', 'Movie', '2021-06-11', NULL, 'https://m.media-amazon.com/images/M/MV5BYWFmZmJhNzQtNDk2Zi00MWViLThkNjgtNTM2NGRiYmUxNjE4XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 323
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Cosas imposibles', 'A widow who is tormented by the memory of her abusive husband befriends a young man.', 'Movie', '2021-06-17', NULL, 'https://m.media-amazon.com/images/M/MV5BNzg1ZGQ0NWMtODFlNi00NjRjLTkzOTQtYjU4ZmVhYzRiMWI2XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 324
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Pure White', 'Vural, a husband and a father who was raised in faith, leads a seemingly pious and conformist life. But everything takes a sudden dark turn when he finds out a truth about his personal life.', 'Movie', '2022-10-21', NULL, 'https://m.media-amazon.com/images/M/MV5BN2IwNTE5NDYtNTVhMi00YTZiLThjNTQtYmEyMzYxNmVhNThkXkEyXkFqcGdeQXVyNTUxNzE3NzM@._V1_SX300.jpg'); -- item_id = 325
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Desert Moon', 'A vicious animal attack reignites painful memories for a small town Sheriff as he attempts to find justice for a crime spree that occurred twenty-five years prior. He encounters a married couple on a romantic getaway and the hitch...', 'Movie', '2021-12-25', NULL, 'https://m.media-amazon.com/images/M/MV5BNTE0MDBjYWEtNGEwZC00MjUxLThlYmYtZWI1MTU1ZjIzOGZjXkEyXkFqcGdeQXVyMjI1MTgxOTY@._V1_SX300.jpg'); -- item_id = 326
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Adventures in Game Chasing', 'Billy and Jay, friends since kids and now beat down with life, go on an adventure to track down Billy''s original NES gaming system in order to play it one more time.', 'Movie', '2022-01-20', NULL, 'https://m.media-amazon.com/images/M/MV5BYzgwOTU1ODktMWUzNi00NzAyLTgxNDgtMDQ4MDY5NDZiYTk5XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 327
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Cursed Films', 'Cursed Films is a five part documentary series which explores the myths and legends behind some of Hollywood''s notoriously cursed horror film productions.', 'TV Show', '2020-04-02', NULL, 'https://m.media-amazon.com/images/M/MV5BYzk4ODUzODAtNDQ4OS00Yjk4LTk2NzQtYWEzMWY2Mzg4OWM0XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 328
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Fear of Rain', 'A girl living with schizophrenia struggles with terrifying hallucinations as she begins to suspect her neighbor has kidnapped a child. The only person who believes her is Caleb - a boy she isn''t even sure exists.', 'Movie', '2021-02-12', NULL, 'https://m.media-amazon.com/images/M/MV5BMDI2YjY5MjUtMWE1MS00NzRlLWFjOGUtMDAwZTU4NzI0NzI4XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 329
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Gentefied', 'The Morales cousins scramble to save their grandfather''s taco shop--and pursue their own dreams--as gentrification shakes up their LA neighborhood.', 'TV Show', '2020-02-21', NULL, 'https://m.media-amazon.com/images/M/MV5BZTY5NTJmMzMtMmQ3OC00OWM3LTk0MzgtZTRiNTJhZDNjMzk5XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 330
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Power Alley', 'On the eve of a volleyball championship decisive for her future as an athlete, 17-year-old Sofía discovers an unwanted pregnancy. In an attempt to interrupt it clandestinely, she ends up becoming the target of a fundamentalist group.', 'Movie', '2023-12-06', NULL, 'https://m.media-amazon.com/images/M/MV5BMmRkZTgwYjktZDk3Yi00MzUyLWI1ZTctODQwZWIwOWQyYTU2XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 331
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('One Moment', 'Middle-age siblings struggle to manage their lives while caring for their recently widowed aging father. Welcome to the "sandwich generation."', 'Movie', '2022-05-13', NULL, 'https://m.media-amazon.com/images/M/MV5BMzc2Nzk0YTctNTE2Ny00ZTAwLTkyNzItODYzNzhjYTUxYmQyXkEyXkFqcGdeQXVyMTQ2OTU2OTQ@._V1_SX300.jpg'); -- item_id = 332
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Our Lady of San Juan, Four Centuries of Miracles', 'In this dramatization, the Virgin Mary works a miracle on a girl in 1623 Mexico. Four centuries later, a family make a pilgrimage for their own child.', 'Movie', '2021-02-02', NULL, 'https://m.media-amazon.com/images/M/MV5BNTY0MWMxZmMtNWNlOS00NzQ4LTlkMzAtOTI5N2ZmNzY5YmQ0XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 333
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Roses. Film-Cabaret', 'ROSES. Film-Cabaret is a documentary cinéma vérité, following Dakh Daughters - an intellectual freak cabaret band, created by seven actresses under the roof of Kyiv experimental contemporary theater Dakh. The video diary spans alm...', 'Movie', '2021-03-27', NULL, 'https://m.media-amazon.com/images/M/MV5BOTBlZGE1NjAtYzE1Mi00MjRiLTk5NTAtNDA5ODk1MWY3YjQxXkEyXkFqcGdeQXVyMTAwNTIxOTYy._V1_SX300.jpg'); -- item_id = 334
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Once a Year on Blackpool Sands', 'A gritty Northern LGBTQ comedy drama. Blackpool 1953. Two young gay Yorkshire miners, Eddy and Tommy, on their annual holiday there, meet transvestite James Elbridge who is summoning up the courage to do the fabled walk from pier ...', 'Movie', '2021-11-21', NULL, 'https://m.media-amazon.com/images/M/MV5BOWU5MjU5NWYtZTZkOC00ZmRkLTk4YjAtYjQ4OTJiZTczNzEzXkEyXkFqcGdeQXVyMTY2MzUxMjk@._V1_SX300.jpg'); -- item_id = 335
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('JerryMaya''s Detective Agency: The Secret of the Train Robber', 'Lasse and Maja have had their detective agency shut down by the police chief when a customer ask for help to prove her father is innocent of the train robbery he was convicted of. Lasse and Maja now see their great chance to show ...', 'Movie', '2020-02-07', NULL, 'https://m.media-amazon.com/images/M/MV5BNzJkZDM0ZjItM2NjNS00OTJiLTg3ZmQtM2Y3YWQ2OGJiMTlkXkEyXkFqcGdeQXVyMjA1MTY4MTc@._V1_SX300.jpg'); -- item_id = 336
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Mamma Moo Finds Her Way Home', 'When a globetrotting stork shows up at the farm, Mamma Moo has reason to ask the question: what is a home, really? How can she be sure that the meadow and farm where she is now are actually her home? What if there''s something bett...', 'Movie', '2022-09-09', NULL, 'https://m.media-amazon.com/images/M/MV5BZTJmYjBhZjEtYmE1Mi00ZTc2LTk4MzctMmQ4NWYxZmYwMmZiXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 337
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Luxor', 'When British aid worker Hana returns to the ancient city of Luxor, she meets former lover Sultan. As she wanders, haunted by the familiar place, she struggles to reconcile the choices of the past with the uncertainty of the present.', 'Movie', '2020-12-04', NULL, 'https://m.media-amazon.com/images/M/MV5BYTAwNTFlOGQtYmNjOC00YWNmLTkwYWItODkwMGU2NzZkNjcwXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 338
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('In the Cold Dark Night', 'Set in the heart of the American South, IN THE COLD DARK NIGHT examines both the 1983 and 2018 investigations into the murder of a Black man, Timothy Coggins.', 'Movie', '2020-07-17', NULL, 'https://m.media-amazon.com/images/M/MV5BNmIxYzNkNzAtMGIxMy00ZTIxLTg1MTItMTUyNGM2NDM5NTI1XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 339
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('12 O''Clock', '12 ''o'' Clock revolves around a young girl Gauri who starts getting traumatised with frightening nightmares and incidents of eerie sleepwalking. What follows to extricate her from the possession forms the crux of the story.', 'Movie', '2021-01-08', NULL, 'https://m.media-amazon.com/images/M/MV5BYTM2YzQ2ZWUtZGFmNy00NWYyLTk3NDctZjFhM2VhOWNmOGEwXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 340
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Gonarezhou: The Movie', 'How do you survive in an isolated village with a small human population and an even larger wildlife one? For Zulu, a rural, cultured man, it is a constant battle for survival. He lives a fantasy of an acclaimed musician. In realit...', 'Movie', '2020-02-11', NULL, 'https://m.media-amazon.com/images/M/MV5BM2Q1NGY5ZjctOTQ3OS00ZWQ0LTk5OGMtM2QxNzY5ZjIxOGJhXkEyXkFqcGdeQXVyMjY0NDE2MTI@._V1_SX300.jpg'); -- item_id = 341
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Falling Stars', 'On the first night of harvest, three brothers set out for the desert to see a witch''s corpse.', 'Movie', '2023-08-05', NULL, 'https://m.media-amazon.com/images/M/MV5BMDdmM2FhYWMtNjhmYy00NmVjLWE1MjMtZDkyZjlhYTJmODBhXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 342
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('El verano que vivimos', 'Isabel is a journalism student who is in the journal of a Galician coastal town for her work placement. During her stay, she finds an anonymous obituary dedicated to Lucía. It tells a love, friendship and treason story in 1958.', 'Movie', '2020-12-04', NULL, 'https://m.media-amazon.com/images/M/MV5BMTFiZDE2ZTUtNDhhNC00Y2VjLTliZTEtNjgwODZjMjIwMjA0XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 343
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('They Who Surround Us', 'A Ukrainian farmer living in Alberta loses his wife in a tragic accident. Guilt and grief send him into an emotional spiral where mysterious and inexplicable events force him to relive traumatic incidents from his childhood in Ukr...', 'Movie', '2021-08-27', NULL, 'https://m.media-amazon.com/images/M/MV5BYzgxZmY1MzMtYjY2ZS00MTg2LWEwOTUtNzExMmM3MTgzM2U0XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 344
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Promises', 'Plot unknown.', 'Movie', '2021-11-18', NULL, 'https://m.media-amazon.com/images/M/MV5BMDhlNGUzYzgtMWU2Yy00NjQ5LTk4MzgtZWQ2NmUxZTk5NGQ0XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 345
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Generation Wrecks', 'Winner of the Audience Award for Best Feature at The 2022 Florida Film Festival. Set in the spring of 1994, the story follows two 11th graders, Stacy Snyder (Bridget McGarry) and Liz Castillo-Campbell (Victoria Leigh), who were be...', 'Movie', '2021-09-12', NULL, 'https://m.media-amazon.com/images/M/MV5BNGNhOTVkNzAtMjVlZS00ZmVhLTg0ZTYtZmI5M2Y4MTk1NTgwXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 346
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Whisper of Silence', 'Set in the coffee fields of Latin America, the movie unfolds through the eyes of Josefina Moreno, an 18 year-old coffee picker, with a rare and amazing sense of smell.', 'Movie', '2022-01-07', NULL, 'https://m.media-amazon.com/images/M/MV5BN2FjMWQ1M2MtY2JkYS00NDk5LWIyNGEtMDI1MzAyOTI4MzQ5XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 347
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Engaged in Vegas', 'When Jen Delaney and Abe Schatz decide to tie the knot, they head for Las Vegas to create the best engagement video ever. Their relationship takes an unexpected turn and the content they record becomes something else entirely.', 'Movie', '2021-05-04', NULL, 'https://m.media-amazon.com/images/M/MV5BZmE1MjA0ZmUtNGZlYy00MDQxLWFiNDYtM2FhMTY1NmY2MTQ0XkEyXkFqcGdeQXVyMjQ5ODg1NDQ@._V1_SX300.jpg'); -- item_id = 348
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Volk', 'Chechnyan War veteran Alexei Volkovoy (aka Volk) is a brutal gangster in Russia''s underworld as well as a covert agent for the Russian military. Think of him as the Russian Jason Bourne.', 'TV Show', '2020-12-07', NULL, 'https://m.media-amazon.com/images/M/MV5BMzZmMWEzNGUtMDU1ZC00ZmUzLTg0ODgtYTMxYjY3MDY5NTkxXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 349
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Growing Up Milwaukee', 'Behind every statistic is a story. Three inner-city youth growing up in Milwaukee struggle with the daily dilemma of growing up Black and avoiding becoming just another statistic.', 'Movie', '2020-08-22', NULL, 'https://m.media-amazon.com/images/M/MV5BZjMyN2FiNjQtZThmMi00Y2ZjLThkOWMtM2FjZjg0ZjBjZDI1XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 350
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Revenge for Daddy', 'After the unsolved fatal hit-and-run of a woman''s father, a devious plan for revenge reveals the shocking truth behind his death.', 'Movie', '2020-03-19', NULL, 'https://m.media-amazon.com/images/M/MV5BNTIwODc5NTktZTNiMy00OTI0LWI5ZWEtNmEwNjllNGI3Mjk0XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 351
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Block Z', 'At a quarantined university, a disparate group of students must band together if they are going to survive during a deadly viral infection outbreak.', 'Movie', '2020-03-13', NULL, 'https://m.media-amazon.com/images/M/MV5BNzg3MzRmYjktZmU4Ni00MTdkLWE5ODQtMWMwMTk1NWVhMmMyXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 352
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Probe', 'The Probe is an episodic Crime drama of interrelated investigations of corruption surrounding; Law enforcement, the judicial system, politicians and urban drug dealing in Philly.', 'Movie', '2024-01-01', NULL, 'https://m.media-amazon.com/images/M/MV5BZDI5MGYzMjUtOTdjNi00ZDhiLTkzMTEtODdlYjlmNTY2NjMxXkEyXkFqcGdeQXVyMjQ4MjgyNTM@._V1_SX300.jpg'); -- item_id = 353
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('A Trip with Your Wife', 'N/A', 'Movie', '2021-02-10', NULL, 'https://m.media-amazon.com/images/M/MV5BYmNiMTJmY2ItMTExOS00ZjE2LTg5NDgtZDUxOTgxODJlNDZkXkEyXkFqcGdeQXVyNDA0OTI2NA@@._V1_SX300.jpg'); -- item_id = 354
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Bhavachitra', 'Protagonist Vishnu photographer by hobby, takes his camera and goes for a long drive, takes photos of locations and people he meets, from there on story continues and the plot remains in suspense as why is he travelling.', 'Movie', '2022-02-18', NULL, 'https://m.media-amazon.com/images/M/MV5BMDY5ZDQ0MjgtNzBmYy00NjNlLWJlNTQtMzZiNDk1N2I0NThmXkEyXkFqcGdeQXVyNjM4MzMzMjk@._V1_SX300.jpg'); -- item_id = 355
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Boutique Talent', 'Boutique Talent is a comedy of manners that follows Mauve McCray, a budding Talent Agent and the unusual suspects that frequent the McCray Agency.', 'TV Show', '2020-02-01', NULL, 'https://m.media-amazon.com/images/M/MV5BYjdiOTZiOTUtODI1OS00NzlhLWE1NzQtZDljNzBkMjc4ODc0XkEyXkFqcGdeQXVyODYyNjk1Njg@._V1_SX300.jpg'); -- item_id = 356
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Christmas Spirit', 'A lone man with the Christmas Spirit trapped in his head must kidnap a teenage girl in order to save Christmas.', 'Movie', '2023-12-21', NULL, 'https://m.media-amazon.com/images/M/MV5BZjYyOTE1ZTQtYWVhMi00NjBlLTg2M2QtMmQxMjYxZmM5ZTA3XkEyXkFqcGdeQXVyMTA1MjM4MDM@._V1_SX300.jpg'); -- item_id = 357
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Darkling', 'Letter from a girl from Kosovo, dedicated to her missing father, read at the United Nations, in which she publicly addresses the difficult life of Serbs, especially Serb children in the enclaves.', 'Movie', '2022-03-17', NULL, 'https://m.media-amazon.com/images/M/MV5BZjlkMzc0MjMtYjhiNy00MzQ1LWIwZWEtYzFhY2I4ZDNkZjlmXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 358
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Bad President', 'The devil encourages media personality Donald Trump to run for president of the United States, so he can have a political puppet. But throughout Trump''s many gaffes, the devil wonders if he even has a chance of winning.', 'Movie', '2021-09-12', NULL, 'https://m.media-amazon.com/images/M/MV5BYzBhZjYyYTYtZDBmZS00ZmQ0LWI0NjUtYWQ0YzAxMjYyZTEyXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 359
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Kid Behind the Iron Door', 'N/A', 'Movie', '2022-12-03', NULL, 'https://m.media-amazon.com/images/M/MV5BZWRkM2Q0NDctNDJlZC00Mzk0LThjMmMtMzMzOTNiOGMyMGY5XkEyXkFqcGdeQXVyODI4NTQ3Mw@@._V1_SX300.jpg'); -- item_id = 360
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Pet Psychic', '', 'TV Show', '2020-01-14', NULL, 'https://m.media-amazon.com/images/M/MV5BMzE2MzQxMjAtNzhhYy00MjJjLThjMTUtNDZjMjc4M2EyZjBlXkEyXkFqcGdeQXVyMTQ5ODQzNzM@._V1_SX300.jpg'); -- item_id = 361
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Fruitties Are Back', 'The Fruitties is a community of peaceful and cheerful fruits and vegetables that live in a supposedly inactive volcano. One day the rumble of the volcano announces its approaching eruption and forces them to look for a new home. D...', 'TV Show', '2022-03-03', NULL, 'https://m.media-amazon.com/images/M/MV5BY2Y4N2M1ODMtNzk4YS00YWM2LWJmYTAtYjgyMDI3MWU5OGNlXkEyXkFqcGdeQXVyNDY1NTAwNDY@._V1_SX300.jpg'); -- item_id = 362
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Storm Eye', 'Agents of National Security Bureau investigate, control, and catch international and latent corporate spying agents to protect valuable technology products from being stolen.', 'TV Show', '2021-02-23', NULL, 'https://m.media-amazon.com/images/M/MV5BOWE1NDc4YWMtMzMyNy00ZTAxLWJjNDEtZDZlODBkMGUwNjY0XkEyXkFqcGdeQXVyOTE4NzcwNzI@._V1_SX300.jpg'); -- item_id = 363
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('James & Pat & Dave', 'It follows Pat Reyes who is a hardworking hostel manager and online vegetable seller who trains her boss'' hardheaded and exiled grandson as a hostel employee.', 'Movie', '2020-02-12', NULL, 'https://m.media-amazon.com/images/M/MV5BNGMxYmE1NWItYzdmNi00YzliLTgxYjItOGUxOTRjMWVhNzU4XkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_SX300.jpg'); -- item_id = 364
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Followers', 'A story about the lifestyles of women whose lives intersect in this world dominated by social media.', 'TV Show', '2020-02-27', NULL, 'https://m.media-amazon.com/images/M/MV5BZGY3NDk2MjAtODkyMi00YWM4LWIyYTYtMWIwM2IwMTZlZmExXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 365
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Charlie Hustle', 'A prodigal son, on the run with the woman he loves, turns to a life of crime as an enforcer for a notorious loan shark, his father.', 'Movie', '2020-08-01', NULL, 'https://m.media-amazon.com/images/M/MV5BMzJkYzIxMTItNWU1OS00MWQ1LWFjMjItYTI5OTgwZGI4NTAxXkEyXkFqcGdeQXVyNzQ0NzU2OA@@._V1_SX300.jpg'); -- item_id = 366
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Battle Kitty', 'It''s small. It''s fluffy. It rocks a fierce pink bow. It''s no ordinary kitty. It''s Battle Kitty, and Kitty is using her super-strength, monster battling intuition, and amazing accessories to unlock a new battle ground.', 'TV Show', '2022-04-19', NULL, 'https://m.media-amazon.com/images/M/MV5BNWMxN2Q5NDgtMzY5ZS00YzI0LWE1YWYtNDQwNTU1MDlmNzBiXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 367
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Sans soleil', 'N/A', 'Movie', '2021-10-20', NULL, 'https://m.media-amazon.com/images/M/MV5BY2E0YjdiMmItZGM2NC00MWI0LWE0YTAtMmE3YWEwYTFlYTIyXkEyXkFqcGdeQXVyMTMxNjE3MzUy._V1_SX300.jpg'); -- item_id = 368
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Operation Curveball', 'The grotesque, at times even surreal, true story of how the Iraq war was started based on nothing but fake intelligence and the involvement of the German government and the German secret service.', 'Movie', '2021-09-09', NULL, 'https://m.media-amazon.com/images/M/MV5BNjI1ZTRmODktMWZkNC00NDIxLWI0MTQtNzgzNjlhNDAzYWZmXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg'); -- item_id = 369
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Queering Yoga', 'N/A', 'Movie', '2021-10-14', NULL, 'N/A'); -- item_id = 370
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Guest House', 'An newly engaged couple''s buys their dream house but it comes with one small catch, a perennial party animal who lives in the guesthouse.', 'Movie', '2020-09-04', NULL, 'https://m.media-amazon.com/images/M/MV5BZTRjNGVlMWQtOTgyNi00NThhLTgxYjItMGFmNjVhOWViNmI4XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 371
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Shiva''s Daughter', '"Shiva''s daughter" A Movie An English movie.

Background of the story.

This is an emotional love story which ends in tragedy. Both Parents oppose to their children''s loving relationship because they are of different communities f...', 'Movie', '2022-05-15', NULL, 'https://m.media-amazon.com/images/M/MV5BMTE3MWIwMmQtNjg1Mi00ODU0LTk1ZDEtYjAwMWVmOWU2M2ZlXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 372
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Girlfriends Reunited', 'Four single women reunite together after not seeing each other in so many years. When they meet they discover that they haven''t changed much. While together they have wild parties, drinking, dancing and other fun activities. Starr...', 'Movie', '2020-07-14', NULL, 'https://m.media-amazon.com/images/M/MV5BZDQ2ODYzNDgtYmJlYy00ZDgxLTkzNjYtYjk3MzBiZGUwOWJiXkEyXkFqcGdeQXVyNTIwMjY1NjY@._V1_SX300.jpg'); -- item_id = 373
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Famous', 'Driven by a devastating need to expose the truth, celebrity Jason Mast pushes the boundaries of friendship to reveal the true cost of fame. What appears to be a night of celebration turns out to be an intricate plan to confront hi...', 'Movie', '2021-12-10', NULL, 'https://m.media-amazon.com/images/M/MV5BZjNhYWZkMzYtZWRkYy00NmEwLWExOWMtZjU0YWM1YWIxN2Y5XkEyXkFqcGdeQXVyODAzOTIyMTE@._V1_SX300.jpg'); -- item_id = 374
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Zero Distance', 'A photographer faces his questionable past when he finds a picture of a dead body on his apartment floor and his pistol missing a bullet.', 'Movie', '2020-07-21', NULL, 'https://m.media-amazon.com/images/M/MV5BYjVkNGIxZjQtNzNkMy00YjUwLWE0MDktNGE1NGEzMjUzYzdjXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 375
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Song Without Words', 'Some robots are more real than others.', 'Movie', '2022-02-11', NULL, 'https://m.media-amazon.com/images/M/MV5BNTc4MDBhZjItMWE3My00YjdlLWFmYjgtZWVlY2ZiMGNkM2Q5XkEyXkFqcGdeQXVyNjkzOTkwMQ@@._V1_SX300.jpg'); -- item_id = 376
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('D.O.P.E. UNIT', 'A LAPD Sergeant''s son is found dead after a drug deal goes awry. He then selects 4 rookie officers with ties to the drug world, to; go undercover, Investigate, disrupt, dismantle, and arrest the Kingpins, from Mexico all the way t...', 'TV Show', '2024-12-01', NULL, 'https://m.media-amazon.com/images/M/MV5BYmFhM2E5ODItNGEyYi00MzYwLWI4ZDUtZjdjNWQzM2YwNDYzXkEyXkFqcGdeQXVyMjA4MDMxNjI@._V1_SX300.jpg'); -- item_id = 377
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Eye and the Wall', 'The days are numbered, run.', 'Movie', '2021-12-09', NULL, 'https://m.media-amazon.com/images/M/MV5BMTljNTFhMzYtYzhlNy00NTFjLWE1NDktNTViZDE4Mzg1NTIyXkEyXkFqcGdeQXVyMTUwMjUwNDQ5._V1_SX300.jpg'); -- item_id = 378
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Curse of Bryerstone', 'The year is 1885 and the small town of Bryerstone is visited by Razell Withernitch, a mysterious witch doctor. One by one the town citizens are tempted to try his strange brew which erupts everything into chaos.', 'Movie', '2020-09-01', NULL, 'https://m.media-amazon.com/images/M/MV5BNDFmYTEwZjAtZGY5Yy00ODhjLWEwNzktZDFlYzExNmE0N2I0XkEyXkFqcGdeQXVyNDM1OTM2NTU@._V1_SX300.jpg'); -- item_id = 379
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Supercool', 'Lifelong friends Neil and Gilbert''s undeniable bond is tested to the limits when Neil makes a magical wish that comes true. With the assistance of Neil''s charismatic neighbor, Jimmy, and Gilbert''s wild ideas, Neil endures one epic...', 'Movie', '2022-02-11', NULL, 'https://m.media-amazon.com/images/M/MV5BM2IwZGUyZGYtZThkMy00ZjI3LThlNzEtOWIzMTFiNDhlYjM4XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 380
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Youngest', 'A young girl who recently lost her father bonds with one of her older sibling''s friends at a high school house party. When she experiences her first heartbreak, she takes matters into her own hands.', 'Movie', '2020-01-01', NULL, 'https://m.media-amazon.com/images/M/MV5BMWNmY2E0N2ItOTY4Yi00NGNkLTk5MDQtNGFiNGVlZmU3MzgyXkEyXkFqcGdeQXVyMTE2NzY1OTk2._V1_SX300.jpg'); -- item_id = 381
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Cortex', 'Hagen develops disturbing nightmares and soon can no longer distinguish between dream and reality.', 'Movie', '2020-10-22', NULL, 'https://m.media-amazon.com/images/M/MV5BNjk0YjA3NjgtZTkxMy00YjRhLTk0YzctN2JlNDZkMTEwZTkwXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 382
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('No Time to Run', 'Due to circumstances beyond her control, a small town daughter, wife and mother must confront threats to herself, her family and her country. Most important, she must overcome her own insecurities to help save America from tyranny...', 'Movie', '2020-10-26', NULL, 'https://m.media-amazon.com/images/M/MV5BZmFlZDJkN2EtZWU5MC00MGJlLTgxODctMWVlNTdjMjM0YWNiXkEyXkFqcGdeQXVyMTU0NTg2NTE@._V1_SX300.jpg'); -- item_id = 383
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Kun Lun Gui', 'With the universe as its stage, the story revolves around two couples, man and woman, human and extraterrestrial and their complicated entanglements of love and hate in the face of imminent danger.', 'TV Show', '2020-07-07', NULL, 'https://m.media-amazon.com/images/M/MV5BMWVjZmI2YTQtOTllNC00NGE4LWEzMWQtYjU4YzBlNjU5OTRjXkEyXkFqcGdeQXVyNDc2NjEyMw@@._V1_SX300.jpg'); -- item_id = 384
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Hunting the hunters', 'Student film Hunting the hunters (Lov na lovce) is about two hunters, the first of them is an apprentice and the second is his teacher. This dramatic film takes places in Middle Ages.', 'TV Show', '2020-04-24', NULL, 'https://m.media-amazon.com/images/M/MV5BMDVmZTA1NWMtMzQwYS00YTBmLWIxOWYtNjJjNzg5ZmRjMWRlXkEyXkFqcGdeQXVyOTk1MjI1MDY@._V1_SX300.jpg'); -- item_id = 385
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('The Third Strike', 'In the 1980''s the war on drugs directly led to The Three-strikes Law. And for over 20 years it''s been tearing families apart.', 'Movie', '2020-03-07', NULL, 'https://m.media-amazon.com/images/M/MV5BZDViN2FkNzItOThlMi00M2E0LWExNTktNDUyMzMwYWM1MTRlXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 386
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Lonesome Boy', 'Hugo, a teenager, imagines a movie about his loneliness.', 'Movie', '2020-04-14', NULL, 'https://m.media-amazon.com/images/M/MV5BNWU4Mzc5MzUtYzI4ZC00ZDJiLWJhMGItYThlNzQ2NTNmOTE0XkEyXkFqcGdeQXVyMTQzNTE0NTU@._V1_SX300.jpg'); -- item_id = 387
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('La otra parte', 'N/A', 'Movie', '2021-11-12', NULL, 'https://m.media-amazon.com/images/M/MV5BMzkxMDExOWMtMzBlYi00ZDI4LWJlNTktYzczZDA3MGEwYTFhXkEyXkFqcGdeQXVyNjczNjE0MzI@._V1_SX300.jpg'); -- item_id = 388
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Un hombre alado', 'A winged man is a documentary feature film about the creative, artistic and technical process of Gustavo Cerati. Through testimonies of people who knew him, and the voice of Gustavo himself, we will reveal aspects of his musical c...', 'Movie', '2020-07-24', NULL, 'https://m.media-amazon.com/images/M/MV5BZDVmN2NiNGQtYTI1Yi00NWFmLWFiZGEtMzhmMTQwNTY2YWJjXkEyXkFqcGdeQXVyNjczNjE0MzI@._V1_SX300.jpg'); -- item_id = 389
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Devil Put the Coal in the Ground', 'Uniquely structured upon the personal storytelling of native West Virginians, Devil Put The Coal In The Ground is a meditation on the suffering and devastation brought on by the coal industry and it''s decline. From the realities o...', 'Movie', '2021-01-01', NULL, 'https://m.media-amazon.com/images/M/MV5BZGU3YzdlODQtY2M5Ni00ZGIwLWJiYjEtYWU2OWNjNzU3ZDIxXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 390
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Trust Me, I''m Sick', 'A short documentary series exploring how chronic illness impacts the lives of five individuals in Los Angeles, California.', 'Movie', '2020-01-01', NULL, 'https://m.media-amazon.com/images/M/MV5BNTU3MDI5MmQtNTEyZC00ZTNiLTkzMDUtOGNjMWE2ZmE3OTkyXkEyXkFqcGdeQXVyNjk1NjgzODE@._V1_SX300.jpg'); -- item_id = 391
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('David Mirisch, the Man Behind the Golden Stars', 'The documentary about the life of legendary Hollywood P.R. man David Mirisch.', 'Movie', '2021-01-01', NULL, 'https://m.media-amazon.com/images/M/MV5BZTUxZDE5MTUtZTBlNC00ZDk1LTljY2ItNzBkNDI4OGRjOGFjXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 392
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Unhinged', 'After a confrontation with an unstable man at an intersection, a woman becomes the target of his rage.', 'Movie', '2020-08-21', NULL, 'https://m.media-amazon.com/images/M/MV5BMmQ2OTZiNmUtZDc4MS00ODY2LTg2MzEtYzE1ZDFiMDRmNTM2XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 393
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('HAM: A Musical Memoir', 'A live recording of Sam Harris''s award-winning one-man musical performance, tracing his rise to stage stardom.', 'Movie', '2020-12-03', NULL, 'https://m.media-amazon.com/images/M/MV5BODliODFjOGMtOWU4NS00NTY3LTliZTctNzNmNDliMGM3ODU0XkEyXkFqcGdeQXVyNTcwMzkyNDE@._V1_SX300.jpg'); -- item_id = 394
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Iconicity', 'A voyage to the frontier of artistic expression, Iconicity takes a road trip from the Coachella Valley to the dying Salton Sea in an intimate exploration of the powerful forces that drive our humanity.', 'Movie', '2020-01-06', NULL, 'https://m.media-amazon.com/images/M/MV5BNDU5NjA2YjQtMTEzYi00ZGY5LWFiYmUtMjg1ZjcyYmY2YWJhXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 395
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Gunpoint', 'This is a disturbing thriller about a home invasion of a wealthy family that lives in a small-high end apartment. The family is taken hostage as the invader psychologically tortures David, the head of the household, by causing har...', 'Movie', '2021-02-09', NULL, 'https://m.media-amazon.com/images/M/MV5BMTc2NTI5MzgtYWFhNC00ZmZhLWE3NTktZDJkNmM4YWFjMzFjXkEyXkFqcGdeQXVyOTg3NjcxMTM@._V1_SX300.jpg'); -- item_id = 396
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Country Queen', 'When an invasive mining company threatens the existence of her village, a city girl caught between two worlds must return home, overcome her painful past to save the village and find herself in the process.', 'TV Show', '2022-07-15', NULL, 'https://m.media-amazon.com/images/M/MV5BMzY3ZjM2N2YtMDE5Zi00NWYzLWJlMTMtMTY5OWRmOWJlYjkyXkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 397
INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) VALUES ('Never Have I Ever', 'The complicated life of a first-generation Indian-American teenage girl, inspired by Mindy Kaling''s own childhood.', 'TV Show', '2020-04-27', NULL, 'https://m.media-amazon.com/images/M/MV5BNzdhOGVjMTQtOTQ0Yi00ZWNjLTk2MjMtMWMzODczNWNiNmM3XkEyXkFqcGc@._V1_SX300.jpg'); -- item_id = 398

-- ContentItemGenre Inserts
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (299, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (300, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (300, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (300, 13);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (301, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (301, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (302, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (302, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (303, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (304, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (305, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (305, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (305, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (306, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (306, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (307, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (308, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (309, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (309, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (309, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (310, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (310, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (311, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (312, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (312, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (313, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (314, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (315, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (316, 14);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (316, 5);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (317, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (318, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (318, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (318, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (319, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (319, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (319, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (320, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (321, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (322, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (323, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (324, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (325, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (326, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (327, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (328, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (328, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (329, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (329, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (329, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (330, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (331, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (331, 17);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (332, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (333, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (333, 2);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (334, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (334, 24);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (335, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (335, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (335, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (336, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (336, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (336, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (337, 23);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (337, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (337, 18);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (338, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (338, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (339, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (340, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (340, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (341, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (342, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (342, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (343, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (343, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (344, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (345, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (345, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (346, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (347, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (348, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (349, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (350, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (351, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (352, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (352, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (352, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (353, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (354, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (355, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (355, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (356, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (357, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (357, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (358, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (358, 4);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (359, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (359, 9);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (360, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (360, 19);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (361, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (362, 23);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (362, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (362, 18);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (363, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (363, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (364, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (364, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (365, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (365, 21);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (366, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (367, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (367, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (367, 23);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (368, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (369, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (369, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (369, 2);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (370, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (371, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (372, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (373, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (373, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (374, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (375, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (376, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (377, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (377, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (378, 13);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (379, 16);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (380, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (380, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (380, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (381, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (382, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (382, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (382, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (383, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (383, 13);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (384, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (384, 9);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (384, 13);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (385, 2);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (385, 25);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (386, 20);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (386, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (386, 10);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (387, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (387, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (387, 18);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (388, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (389, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (390, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (391, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (392, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (393, 11);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (393, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (394, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (394, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (394, 24);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (395, 3);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (396, 6);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (397, 1);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (398, 12);
INSERT INTO ContentItemGenre (item_id, genre_id) VALUES (398, 1);