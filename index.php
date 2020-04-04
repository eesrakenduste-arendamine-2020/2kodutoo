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
    <link rel="stylesheet" href="main.css">
</head>
<body>

<?php

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
            <div>
                <p>SORTEERI</p>
                <p>Aeg</p>
                <p>Nimetus</p>
                <p>Olulised</p>
                <p>Tehtud</p>
                <br>
                <p>KATEGOORIAD</p>
                <p>Kodu</p>
                <p>Kool</p>
                <p>Trenn</p>
            </div>
        </div><!--.i2_text-->
    </div><!--.i2-->

    <div class="item i3">
        <div class="i3__box">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="36px" height="36px"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                <input class="input-field" type="text">
        </div><!--.i3__box-->

        <div class="i3__list">

            <div class="i3__list__item todo-item">
                <div class="l1 checkmark">&#10004;</div>
                <div class="l2 circle blueCircle"></div>
                <div class="l3 list__text">Osta moosipalle</div>
                <div class="l4"></div>
                <div class="l5">Kategooria</div>
                <div class="l6 remove">&#10008;</div>
            </div>

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
                <form action="" class="dialobBox__form">

                    <div class="inputBox">
                        <input class="inputBox__input" type="text">
                    </div>      
                    <button class="submitBox" type="submit">
                        <div class="submitBox__content">Loo</div>
                    </button>
                </form><!--.dialobBox__form-->
            </div><!--.dialogBox__fields-->
        </div><!--.dialogBox-->

    </div><!--.addNewTaskModal__content-->
</div><!--.addNewTaskModal-->

<script src="script.js"></script>
</body>
</html>