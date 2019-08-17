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
            $sql = "select * from contacts";
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
            $rating = isset($_POST['rating']) ? intval($_POST['rating']) : 0;

            if ($id > 0) {
                // change existing record
                $sql = "update contacts set name = :name, email = :email, city=:city, state=:state, zip=:zip, phone=:phone, rating=:rating, date_updated = NOW() where id = :id";
                $sql_data = [
                    'name' => $name,
                    'email' => $email,
                    'city' => $city,
                    'state' => $state,
                    'zip' => $zip,
                    'phone' => $phone,
                    'rating' => $rating,
                    'id' => $id,
                ];
                $stmt = $pdo->prepare($sql);
                $stmt->execute($sql_data);
                // $result = $stmt->fetch();

            } else {
                // add new record
                $sql = "insert into contacts (name, email, city, state, zip, phone, rating, date_created) values (:name, :email, :city, :state, :zip, :phone, :rating, NOW())";
                $sql_data = [
                    'name' => $name,
                    'email' => $email,
                    'city' => $city,
                    'state' => $state,
                    'zip' => $zip,
                    'phone' => $phone,
                    'rating' => $rating,
                ];
                $stmt = $pdo->prepare($sql);
                $stmt->execute($sql_data);
                // $result = $stmt->fetch();

            }
        }
        break;
}

if ($method == 'GET') {
    echo json_encode($stmt->fetchAll());
} elseif ($method == 'POST') {
    echo json_encode($stmt->rowCount());
} else {
    echo $stmt->$rowCount();
}
