const comparingColor = "#f0d98d";
const sortedColor = '#529c61';
const normalColor = "#916d84";

let storeCur = [];
let timeouts = [];
let store = [];

export function HeapSort(valArr, visArr, animSpeed, setIsSorting) {
    
    for (let i = 0; i < visArr.length; i++) {
        visArr[i].style.backgroundColor = normalColor;
    }
    let l = valArr.length;
    let timeInc = 0;

    const heapify = (a, i) => {
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        let leftBlockStyle;
        let rightBlockStyle;

        if (left < l)
            leftBlockStyle = visArr[left].style;
        if (right < l)
            rightBlockStyle = visArr[right].style;
        timeouts.push(setTimeout(() => {
            if (leftBlockStyle != null)
                leftBlockStyle.backgroundColor = comparingColor;
            if (rightBlockStyle != null)
                rightBlockStyle.background = comparingColor;
        }, timeInc * animSpeed));
        timeInc++;

        let max = i;
        if (left < l && a[left] > valArr[max])
            max = left;
        if (right < l && a[right] > valArr[max])
            max = right;
        if (max !== i) {
            [a[max], a[i]] = [a[i], a[max]];
	    let tI = a[i];
	    let tM = a[max];
            timeouts.push(setTimeout(() => {
		visArr[i].style.height = `${tI / 10}%`;
		visArr[max].style.height = `${tM / 10}%`;
            }, timeInc * animSpeed));
            timeInc++;
            heapify(a, max);
        }
        timeouts.push(setTimeout(() => {
            if (leftBlockStyle != null)
                leftBlockStyle.backgroundColor = normalColor;
            if (rightBlockStyle != null)
                rightBlockStyle.background = normalColor;
        }, timeInc * animSpeed));
        timeInc++;
    };

    let i;
    for (i = Math.floor(l / 2); i >= 0; i--)
        heapify(valArr, i);
    for (i = valArr.length - 1; i > 0; i--) {
        [valArr[0], valArr[i]] = [valArr[i], valArr[0]];

        let j = i;
	    let tZero = valArr[0];
	    let tJ = valArr[j];
        timeouts.push(setTimeout(() => {
            let temp = visArr[0].style.height;
            visArr[0].style.height = `${tZero/ 10}%`; 
            visArr[j].style.height = `${tJ / 10}%`;
            visArr[j].style.backgroundColor = sortedColor;
        }, timeInc * animSpeed));
        timeInc++;
        l--;
        heapify(valArr, 0);
    }
    timeouts.push(setTimeout(() =>{ 
    setIsSorting(false);
    }, timeInc * animSpeed));
}

export function pauseHeapSort(valArr, setValArr, visArr) {
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }

    for (let i = 0; i < visArr.length; i++) {
        valArr[i] = (parseInt(visArr[i].style.height.replace(".", "")));
    }
}
