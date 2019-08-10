
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `vuedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `city`, `state`, `zip`, `phone`, `date_created`, `date_updated`) VALUES
(1, 'Bill Gates', 'bill@microsoft.frank', 'Seattle', 'WA', '23094', '800-555-1212', '2019-08-02 11:58:28', '2019-08-02 15:28:23'),
(4, 'Franklin Templeton', 'mine@aol.com', 'Denver', 'CO', '23897', '800-555-1212', '2019-08-02 11:58:28', '2019-08-09 19:16:58'),
(6, 'Jill Ames', 'jill@hotmail.com', 'Tville', 'CA', '90120', '3104569898', '2019-08-02 11:58:28', '2019-08-09 19:18:19'),
(8, 'Brad Bradley', 'brad@gmail.com', 'city', 'usa', '84118', 'null', '2019-08-02 11:58:28', '2019-08-09 19:20:56'),
(9, 'new oneasdf', 'email@email.com', 'cityasdfasdf', 'usa', 'job', 'null', '2019-08-02 11:58:28', '2019-08-09 19:16:16'),
(10, 'new name', 'me@me.com', '11', '1', '1', NULL, '2019-08-02 11:58:28', '2019-08-02 11:58:28'),
(12, 'Jacob VanOver', 'jacob@me.com', 'heaven', 'earth', 'a-dee-doo-da', '801-969-9696', '2019-08-02 11:58:28', '2019-08-09 19:22:49'),
(13, 'Remove this', 'email@email.com', '', 'ASDFADSF', 'my new job', NULL, '2019-08-02 11:58:28', '2019-08-02 11:58:28'),
(15, 'removed', 'asdfasd@email.com', 'City', 'USA', 'Enter', NULL, '2019-08-02 11:58:28', '2019-08-02 11:58:28'),
(17, 'new one', '', '', '', 'asdd', NULL, '2019-08-02 11:58:28', '2019-08-02 11:58:28'),
(21, 'Billy', 'bill@aol.com', '', 'USA', 'Janitor', NULL, '2019-08-02 11:58:28', '2019-08-02 11:58:28'),
(22, 'name', 'email@email.com', '', 'it', 'out', '555-1212', '2019-08-02 11:58:28', '2019-08-02 11:58:28'),
(35, 'spyder', 'spyder@spyder.com', '', '', '', '', '2019-08-02 11:58:28', '2019-08-02 14:26:11'),
(36, 'Frankie', 'asdfasdf@asdfasdf.com', '', 'asdfasdf', 'asdfasdf', 'asdfasdf', '2019-08-02 11:58:28', '2019-08-02 12:23:16'),
(37, 'jon', 'jon@jon.co', 'city', 'state', 'zip', 'phone', '2019-08-02 11:58:28', '2019-08-09 18:12:47'),
(41, 'Betty Rubble', 'mayor@city.org', 'Anyplace', 'California', '90120', '2133339999', '2019-08-02 12:28:43', '2019-08-09 19:17:36'),
(46, '', 'asdfasdf', '', '', 'asdfasdf', '', '2019-08-02 14:29:17', '2019-08-09 18:12:52'),
(47, 'what', 'email@email.com', '', '', '', '', '2019-08-02 14:29:23', '2019-08-03 08:20:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
COMMIT;
