
function Slider(direction, min, max, width, height, position, text) {

    var min = min
    var max = max

    var direction = direction

    var current = 0

    var slider = document.createElement("div")
    slider.className = "slider"
    slider.style[position] = 0
    slider.style.height = height + "px"
    slider.style.width = width + "px"

    var div_red = document.createElement("div")
    div_red.className = "slider_red"
    div_red.innerHTML = text

    slider.appendChild(div_red)

    var div_yellow = document.createElement("div")
    div_yellow.className = "slider_yellow"

    slider.appendChild(div_yellow)



    if (direction == 1) // vertical
    {
        slider.style.top = 0

        div_red.style.top = (height - width) / 2 + "px"
        div_red.style.left = 0
        div_yellow.style.top = (height - width) / 2 + "px"
        div_yellow.style.left = 0

        div_yellow.style.height = width + "px"
        div_red.style.height = width + "px"
        div_yellow.style.width = width + "px"
        div_red.style.width = width + "px"
    }
    else // horizontal
    {
        slider.style.bottom = 0
        slider.style.left = 0
        div_red.style.left = (width - height) / 2 + "px"
        div_red.style.bottom = 0
        div_yellow.style.bottom = 0
        div_yellow.style.left = (width - height) / 2 + "px"

        div_yellow.style.height = height + "px"
        div_red.style.height = height + "px"
        div_yellow.style.width = height + "px"
        div_red.style.width = height + "px"
    }


    var start = false

    if (direction == 1) {
        document.addEventListener("mousemove", function (event) {
            if (start) {
                var y = event.clientY
                if (y >= parseInt(div_red.style.height) / 2 && y <= height - parseInt(div_red.style.height) / 2)
                    div_red.style.top = y - parseInt(div_red.style.height) / 2 + "px"
            }
        })
    }
    else {
        document.addEventListener("mousemove", function (event) {
            if (start) {
                var x = event.clientX
                if (x >= parseInt(div_red.style.width) / 2 && x <= width - parseInt(div_red.style.width) / 2)
                    div_red.style.left = x - parseInt(div_red.style.width) / 2 + "px"
            }
        })
    }

    div_red.addEventListener("mousedown", function () {
        start = true
    })

    document.addEventListener("mouseup", function () {
        start = false
    })


    this.getCurrent = function () {
        return current
    }

    this.getSlider = function () {
        return slider
    }

    this.update = function () {
        if (direction == 1) {
            if (parseInt(div_yellow.style.top) > parseInt(div_red.style.top)) {
                div_yellow.style.top = parseInt(div_yellow.style.top) - 1 + "px"
                current += max / 100
            }
            else if (parseInt(div_yellow.style.top) < parseInt(div_red.style.top)) {
                div_yellow.style.top = parseInt(div_yellow.style.top) + 1 + "px"
                current -= max / 100
            }
        }
        else {
            if (parseInt(div_yellow.style.left) > parseInt(div_red.style.left)) {
                div_yellow.style.left = parseInt(div_yellow.style.left) - 1 + "px"
                current -= max / 100
            }
            else if (parseInt(div_yellow.style.left) < parseInt(div_red.style.left)) {
                div_yellow.style.left = parseInt(div_yellow.style.left) + 1 + "px"
                current += max / 100
            }
        }
    }

}