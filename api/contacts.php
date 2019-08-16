<?php
$host = "localhost";
$user = "vue";
$password = "_(*&)(*BNKLJN*&^uih5765876%u7^5&65TDyTdYTfyTf";
$dbname = "vuedb";
$charset = 'utf8mb4';
$sql = '';
$sql_data = [];
$result = '';
$stmt = '';

$id = '';
// $con = mysqli_connect($host, $user, $password, $dbname);

$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
try {
    $pdo = new PDO($dsn, $user, $password, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int) $e->getCode());
}

$method = $_SERVER['REQUEST_METHOD'];
// $request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
//$input = json_decode(file_get_contents('php://input'),true);
switch ($method) {
    case 'GET':
        $id = isset($_GET['id']) ? intval($_GET['id']) : '';
        if ($id > 0) {
            $sql = "select * from contacts where id=:id";
            $sql_data = ['id' => $id];
            $stmt = $pdo->prepare($sql);
            $stmt->execute($sql_data);
            $result = $stmt->fetch();
        } else {
            $sql = "select * from contacts where disabled != 1";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($sql_data);
            $result = $stmt->fetch();
        }

        break;
    case 'POST':
        $id = isset($_POST['id']) ? intval($_POST['id']) : '';
        $action = isset($_POST['action']) ? $_POST['action'] : '';
        if ($action == 'delete' && $id > 0) {
            // delete record with id = $id
            $sql = "update contacts set disabled = 1, date_updated = NOW() where id = :id";
            $sql_data = ['id' => $id];
            $stmt = $pdo->prepare($sql);
            $stmt->execute($sql_data);
        } else {
            $name = isset($_POST['name']) ? $_POST['name'] : '';
            $email = isset($_POST['email']) ? $_POST['email'] : '';
            $city = isset($_POST['city']) ? $_POST['city'] : '';
            $state = isset($_POST['state']) ? $_POST['state'] : '';
            $zip = isset($_POST['zip']) ? $_POST['zip'] : '';
            $phone = isset($_POST['phone']) ? $_POST['phone'] : '';

            if ($id > 0) {
                // change existing record
                $sql = "update contacts set name = '$name', email = '$email', city='$city', state='$state', zip='$zip', phone='$phone', date_updated = NOW() where id = $id";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($sql_data);
                // $result = $stmt->fetch();

            } else {
                // add new record
                $sql = "insert into contacts (name, email, city, state, zip, phone, date_created) values ('$name', '$email', '$city', '$state', '$zip', '$phone', NOW())";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($sql_data);
                // $result = $stmt->fetch();

            }
        }
        break;
}

// run SQL statement
// $stmt = $pdo->prepare($sql)->execute($sql_data);
// $result = $stmt->fetch();
// $pdo = $stmt->fetchAll();
// var_dump('<pre>', $result, '</pre>');
// die if SQL statement failed
// if (!$stmt || !$result) {
//     http_response_code(404);
//     die('Nothing found.');
// }

if ($method == 'GET') {
    if (!$id) {
        // echo '[';
    }

    echo json_encode($stmt->fetchAll());
    // for ($i = 0; $i < count($result); $i++) {
    // echo ($i > 0 ? ',' : '') . json_encode($stmt->fetchAll());
    // }
    if (!$id) {
        // echo ']';
    }
} elseif ($method == 'POST') {
    echo json_encode($stmt->rowCount());
} else {
    echo $stmt->$rowCount();
}
