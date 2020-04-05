<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo rakendus</title>
    <script
    src="https://code.jquery.com/jquery-3.4.1.js"
    integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
    crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="main.css">
</head>
<body>

<?php

require('functions.php');
?>

<div class="container">

    <div class="item i1">
        <div class="i1__box">

        </div><!--.i1__box-->
    </div><!--.i1-->

    <div class="item i2">
        <div class="i2__box">
        </div><!--.i2__box-->

        <div class="i2__text">
            <div class="filterButtons">
                <p class="filterButtons__button js-all">Kõik</p>
                <br>
                <p class="filterButtons__button js-important">Olulised</p>
            </div>
        </div><!--.i2_text-->
    </div><!--.i2-->

    <div class="item i3">
        <div class="i3__box">
        </div><!--.i3__box-->

        <div class="i3__list">
            
        <div class="i3__list__item todo-item todo-copy">
            <div class="l1 checkmark js-done">&#10003;</div>
            <div class="l2 circle"></div>
            <div class="l3 list__text">Osta moosipalle</div>
            <div class="l4"></div>
            <div class="l5">Kategooria</div>
            <div class="l6 remove">&times;</div>
            <input type="hidden" name="task_id">
        </div>
            <?php createTaskHTML(); ?>
        <div class="i3__list__item add-new">
            <div class="l1"></div>
            <div class="l2 plus">&#10010;</div>
            <div class="l3 list__text add-new-text">Lisa uus</div>
            <div class="l4"></div>
            <div class="l5"></div>
            <div class="l6"></div>
        </div>

        </div>

    </div><!--.i3-->

    <div class="item i4">
        <div class="i4__box">

        </div><!--.i4__box-->
    </div><!--.i4-->

</div><!--.container-->



<div class="addNewTaskModal">
    <div class="addNewTaskModal__content">

        <div class="dialogBox">
            <h1 class="dialogBox__title">Lisa uus ülesanne</h1>
            <div class="dialogBox__titlePadding"></div>
            <div class="dialogBox__closeIcon">
                <div class="dialogBox__close"></div>
            </div>

            <div class="dialogBox__fields">
                <form action="" method="POST" class="dialogBox__form">

                    <div class="inputBox">
                        <input name="todo_name" placeholder="Nimetus" class="inputBox__input" type="text">
                    </div>

                    <div class="inputBox">
                        <input name="category" placeholder="Kategooria" class="inputBox__input" type="text">
                    </div>

                    <div class="inputBox inputCustom">
                        Oluline?
                        <div class="importanceBox fa fa-star"></div>
                    </div>

                    <div class="inputBox inputCustom">
                        Värvus
                        <div class="colorBlock">
                            <div class="customColor circle blueCircle customColorSelected" data-cl="blueCircle"></div>
                            <div class="customColor circle pinkCircle" data-cl="pinkCircle"></div>
                            <div class="customColor circle redCircle" data-cl="redCircle"></div>
                            <div class="customColor circle yellowCircle" data-cl="yellowCircle"></div>
                            <div class="customColor circle greenCircle" data-cl="greenCircle"></div>
                        </div>

                    </div>

                    <button class="submitBox" type="submit">
                        <div class="submitBox__content">Loo</div>
                    </button>
                </form><!--.dialogBox__form-->

            </div><!--.dialogBox__fields-->
        </div><!--.dialogBox-->

    </div><!--.addNewTaskModal__content-->
</div><!--.addNewTaskModal-->

<script src="script.js"></script>
</body>
</html>