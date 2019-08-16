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
  `date_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `disabled` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `city`, `state`, `zip`, `phone`, `date_created`, `date_updated`, `disabled`) VALUES
(1, 'Bill Gates', 'bill@microsoft.frank', 'Seattle', 'WA', '23094', '800-555-1212', '2019-08-02 11:58:28', '2019-08-02 15:28:23', 1),
(4, 'Franklin Templeton', 'mine@aol.com', 'Denver', 'CO', '23897', '800-555-1212', '2019-08-02 11:58:28', '2019-08-09 19:16:58', 0),
(6, 'Jill Ames', 'jill@hotmail.com', 'Tville', 'CA', '90120', '3104569898', '2019-08-02 11:58:28', '2019-08-09 19:18:19', 0),
(8, 'Adam Adamson', 'adam@adamson.org', 'Adamsville', 'NV', '90918', '808-808-8080', '2019-08-02 11:58:28', '2019-08-15 21:43:26', 0),
(9, 'Bart Simpson', 'bart@springfield.org', 'Springfield', 'IL', '87773', '909-909-9090', '2019-08-02 11:58:28', '2019-08-15 21:40:56', 0),
(10, 'new name', 'me@me.com', '11', '1', '1', NULL, '2019-08-02 11:58:28', '2019-08-15 21:37:42', 1),
(12, 'Michael Vranes', 'mike@vranes.org', 'Taylorsville', 'UT', '84118', '801-967-1087', '2019-08-02 11:58:28', '2019-08-15 21:42:49', 0),
(13, 'Remove this', 'email@email.com', '', 'ASDFADSF', 'my new job', NULL, '2019-08-02 11:58:28', '2019-08-15 21:37:48', 1),
(15, 'Albert Einstein', 'e@mc.com', 'Washington', 'DC', '02134', '8005551212', '2019-08-02 11:58:28', '2019-08-15 21:38:37', 0),
(21, 'Billy', 'bill@aol.com', '', 'USA', 'Janitor', NULL, '2019-08-02 11:58:28', '2019-08-15 21:38:13', 1),
(22, 'Franklin Gilbertson IV', 'fg4@email.com', 'Washington', 'OH', '29385', '808-555-1212', '2019-08-02 11:58:28', '2019-08-15 21:39:09', 0),
(35, 'spyder', 'spyder@spyder.com', '', '', '', '', '2019-08-02 11:58:28', '2019-08-15 21:38:10', 1),
(36, 'Fred Flintstone', 'fred@stoney.net', 'Flintville', 'AZ', '28938', '888-268-9999', '2019-08-02 11:58:28', '2019-08-15 21:40:00', 0),
(37, 'John Smithson', 'jsmith@hotmail.com', 'Smithsville', 'WA', '39918', '272-323-4224', '2019-08-02 11:58:28', '2019-08-15 21:42:05', 0),
(41, 'Betty Rubble', 'mayor@city.org', 'Anyplace', 'California', '90120', '2133339999', '2019-08-02 12:28:43', '2019-08-09 19:17:36', 0),
(47, 'what', 'email@email.com', '', '', '', '', '2019-08-02 14:29:23', '2019-08-15 21:38:17', 1),
(48, '', '', '', '', '', '', '2019-08-15 21:51:44', '2019-08-15 22:13:11', 1),
(49, '', '', '', '', '', '', '2019-08-15 21:51:51', '2019-08-15 22:13:08', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;
