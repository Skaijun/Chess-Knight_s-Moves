class Chess {
    constructor(htmlParentElement) {
        this.selectedParentElement = htmlParentElement || document.body;
        this.checkAviableMoves = this.checkAviableMoves.bind(this);
        this.resetDesk = this.resetDesk.bind(this);
        this.renderDOM();
        this.setEventsToDOMElements();
    }

    renderDOM() {
        let squareOutput = '';
        let liForDigitsOut = '';
        let liForLettersOut = '';
        let ulForDigits = document.createElement('ul');
        ulForDigits.classList.add('chess__digits-list');
        let ulForLetters = document.createElement('ul');
        ulForLetters.classList.add('chess__letters-list');
        this.chessboardLetters = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
        for (let i = 8; i > 0; i--) {
            liForDigitsOut += `<li>${i}</li>`;
            liForLettersOut += `<li>${this.chessboardLetters[i - 1]}</li>`;
            for (let k = 8; k > 0; k--) {
                squareOutput += `<div class="chess__square ${this.chessboardLetters[8 - i]}${k}">${this.chessboardLetters[8 - i]}${k}</div>`;
            }
        }
        this.selectedParentElement.insertAdjacentHTML('beforeend', squareOutput);
        ulForDigits.insertAdjacentHTML('beforeend', liForDigitsOut);
        ulForLetters.insertAdjacentHTML('beforeend', liForLettersOut);
        document.querySelector('.chess__field-wrap').append(ulForDigits);
        document.querySelector('.chess__field-wrap').append(ulForLetters);
    }

    setEventsToDOMElements() {
        this.selectedParentElement.addEventListener('click', this.checkAviableMoves);
        document.querySelector('.chess').addEventListener('click', this.resetDesk);
    }

    checkAviableMoves(element) {
        if (element.target.classList.contains('chess__square')) {
            this.clearCurrentMoves();
            element.target.classList.add('chess__square-active');
            this.sourcePointLetter = element.target.innerHTML.split('')[0];
            this.sourcePointX = (8 - this.chessboardLetters.indexOf(this.sourcePointLetter));
            this.sourcePointY = +element.target.innerHTML.split('')[1];
            let possiblePoints = [[this.sourcePointX + 1, this.sourcePointY + 2], [this.sourcePointX + 2, this.sourcePointY + 1], [this.sourcePointX + 2, this.sourcePointY - 1], [this.sourcePointX + 1, this.sourcePointY - 2], [this.sourcePointX - 1, this.sourcePointY - 2], [this.sourcePointX - 2, this.sourcePointY - 1], [this.sourcePointX - 2, this.sourcePointY + 1], [this.sourcePointX - 1, this.sourcePointY + 2]];
            possiblePoints.forEach(([xx, yy]) => {
                if (xx >= 1 && xx <= 8 && yy >= 1 && yy <= 8) {
                    let chessCellClass = [this.chessboardLetters[8 - xx], yy].join("");
                    document.querySelector(`.${chessCellClass}`).classList.add('chess__square-possible');
                }
            });
        }
    }

    clearCurrentMoves() {
        document.querySelectorAll('.chess__square-active').forEach(el => el.classList.remove('chess__square-active'));
        document.querySelectorAll('.chess__square-possible').forEach(el => el.classList.remove('chess__square-possible'));
    }

    resetDesk(element) {
        if (element.target.classList.contains('chess')) {
            this.clearCurrentMoves();
        }
    }


}




window.onload = new Chess(document.querySelector(".chess__field"));

