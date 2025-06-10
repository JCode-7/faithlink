-- Clean seed data for Faith-Link platform
-- Insert sample data for testing and demonstration

SET NAMES utf8mb4;

-- Clear existing data (in correct order)
DELETE FROM user_preferences;
DELETE FROM prayer_requests;
DELETE FROM content_moderation;
DELETE FROM group_memberships;
DELETE FROM groups;
DELETE FROM likes;
DELETE FROM comments;
DELETE FROM posts;
DELETE FROM bible_verses;
DELETE FROM users;

-- Reset auto increment
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE posts AUTO_INCREMENT = 1;
ALTER TABLE comments AUTO_INCREMENT = 1;
ALTER TABLE likes AUTO_INCREMENT = 1;
ALTER TABLE groups AUTO_INCREMENT = 1;
ALTER TABLE group_memberships AUTO_INCREMENT = 1;
ALTER TABLE prayer_requests AUTO_INCREMENT = 1;
ALTER TABLE bible_verses AUTO_INCREMENT = 1;
ALTER TABLE user_preferences AUTO_INCREMENT = 1;

-- Insert sample users
INSERT INTO users (username, email, first_name, last_name, password_hash, bio) VALUES
('sarah_m', 'sarah@example.com', 'Sarah', 'Mitchell', '$2b$10$example_hash_1', 'Passionate about sharing God\'s word and encouraging others in their faith journey.'),
('michael_r', 'michael@example.com', 'Michael', 'Rodriguez', '$2b$10$example_hash_2', 'Prayer warrior and community builder. Love connecting with fellow believers.'),
('emma_l', 'emma@example.com', 'Emma', 'Lee', '$2b$10$example_hash_3', 'Young adult seeking to grow in faith and serve others with love.'),
('david_k', 'david@example.com', 'David', 'Kim', '$2b$10$example_hash_4', 'Bible study leader and mentor. Excited to share wisdom and learn from others.'),
('rachel_w', 'rachel@example.com', 'Rachel', 'Williams', '$2b$10$example_hash_5', 'Mother of three, finding strength in community and God\'s grace daily.');

-- Insert sample groups
INSERT INTO groups (name, description, group_type, creator_id, member_count) VALUES
('Young Adults Ministry', 'A community for young adults (18-30) navigating faith, career, and relationships', 'age_group', 3, 5),
('Bible Study Circle', 'Weekly Bible studies and deep scriptural discussions', 'study', 4, 4),
('Prayer Warriors', 'Dedicated to intercession and supporting each other through prayer', 'prayer', 2, 4),
('New Believers', 'Support and guidance for those new to the Christian faith', 'support', 1, 3),
('Worship & Music', 'For those passionate about worship music and leading others in praise', 'ministry', 5, 3);

-- Insert group memberships
INSERT INTO group_memberships (group_id, user_id, role) VALUES
(1, 1, 'moderator'), (1, 2, 'member'), (1, 3, 'admin'), (1, 4, 'member'), (1, 5, 'member'),
(2, 1, 'member'), (2, 2, 'member'), (2, 4, 'admin'), (2, 5, 'moderator'),
(3, 1, 'member'), (3, 2, 'admin'), (3, 3, 'member'), (3, 5, 'member'),
(4, 1, 'admin'), (4, 3, 'moderator'), (4, 4, 'member'),
(5, 2, 'member'), (5, 3, 'member'), (5, 5, 'admin');

-- Insert sample posts (with emojis properly encoded)
INSERT INTO posts (user_id, content, post_type, likes_count, comments_count) VALUES
(1, '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future." - Jeremiah 29:11\n\nThis verse has been my anchor during challenging times. God\'s plans are always perfect! 🙏', 'verse', 24, 3),
(2, 'Please pray for my family as we navigate a difficult season. We trust in God\'s timing and plan, but would appreciate your prayers for strength and guidance.', 'prayer', 42, 4),
(3, 'Attended an amazing worship service today! The message about God\'s grace really touched my heart. How has God\'s grace impacted your life recently? ✨', 'discussion', 18, 2),
(4, '"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." - Joshua 1:9\n\nStarting a new job next week and this verse is giving me so much peace!', 'verse', 31, 0),
(5, 'Grateful for this community! As a busy mom, it\'s wonderful to connect with other believers who understand the joys and challenges of raising children in faith. Thank you all for your support! 💕', 'discussion', 27, 0),
(1, 'Join us for our weekly Bible study this Thursday at 7 PM! We\'re diving into the book of Philippians and exploring Paul\'s message of joy in all circumstances. All are welcome!', 'discussion', 15, 0),
(3, 'Struggling with anxiety lately and would love your prayers. Trying to remember Philippians 4:6-7 about not being anxious but presenting everything to God in prayer.', 'prayer', 38, 3);

-- Insert sample comments
INSERT INTO comments (post_id, user_id, content, likes_count) VALUES
(1, 2, 'Amen! This verse has carried me through so many storms. God is faithful!', 5),
(1, 3, 'Thank you for sharing this. Exactly what I needed to hear today! 🙏', 3),
(1, 4, 'Jeremiah 29:11 is one of my favorites too. God\'s timing is perfect.', 2),
(2, 1, 'Praying for you and your family, Michael. God is with you! 🙏', 8),
(2, 3, 'Lifting you up in prayer. Trust in His perfect plan.', 6),
(2, 4, 'You\'re in my prayers. Remember that God works all things for good.', 4),
(2, 5, 'Praying for strength and peace for your family during this time.', 7),
(3, 1, 'God\'s grace is new every morning! So thankful for His mercy.', 4),
(3, 2, 'Grace has transformed my entire perspective on life. Amazing!', 3),
(7, 2, 'Praying for peace over your anxiety, Emma. You\'re not alone! 💕', 9),
(7, 4, 'That\'s such a powerful verse. Praying for God\'s peace to fill your heart.', 6),
(7, 5, 'Anxiety is so hard. Praying for you and sending virtual hugs!', 8);

-- Insert sample likes
INSERT INTO likes (user_id, post_id) VALUES
(2, 1), (3, 1), (4, 1), (5, 1),
(1, 2), (3, 2), (4, 2), (5, 2),
(1, 3), (2, 3), (4, 3),
(1, 4), (2, 4), (3, 4), (5, 4),
(1, 5), (2, 5), (3, 5), (4, 5),
(2, 6), (3, 6), (4, 6),
(1, 7), (2, 7), (4, 7), (5, 7);

-- Insert sample prayer requests
INSERT INTO prayer_requests (post_id, is_urgent, prayer_count, status) VALUES
(2, false, 42, 'active'),
(7, false, 38, 'active');

-- Insert sample Bible verses
INSERT INTO bible_verses (book, chapter, verse_start, verse_end, text, version) VALUES
('Jeremiah', 29, 11, 11, 'For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future.', 'NIV'),
('Joshua', 1, 9, 9, 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', 'NIV'),
('Philippians', 4, 6, 7, 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.', 'NIV'),
('Psalm', 23, 1, 1, 'The Lord is my shepherd, I lack nothing.', 'NIV'),
('John', 3, 16, 16, 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', 'NIV');

-- Insert user preferences
INSERT INTO user_preferences (user_id, email_notifications, push_notifications, privacy_level, preferred_bible_version) VALUES
(1, true, true, 'public', 'NIV'),
(2, true, false, 'public', 'ESV'),
(3, false, true, 'friends', 'NIV'),
(4, true, true, 'public', 'NASB'),
(5, true, true, 'friends', 'NIV');

-- Update group member counts based on actual memberships
UPDATE groups SET member_count = (
    SELECT COUNT(*) FROM group_memberships WHERE group_id = groups.id
);

-- Update post like counts based on actual likes
UPDATE posts SET likes_count = (
    SELECT COUNT(*) FROM likes WHERE post_id = posts.id
);

-- Update post comment counts based on actual comments
UPDATE posts SET comments_count = (
    SELECT COUNT(*) FROM comments WHERE post_id = posts.id
);

-- Update prayer request counts based on post likes
UPDATE prayer_requests SET prayer_count = (
    SELECT likes_count FROM posts WHERE id = prayer_requests.post_id
);
