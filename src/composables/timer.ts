import { ref, onUnmounted } from 'vue'

export function useTimer(startFrom: number = 100, step: number = 5) {
    const counter = ref<number>(startFrom);
    const timesUp = ref<boolean>(false);


    const interval = setInterval(function () {
        counter.value--;

        if (counter.value <= 0) {
            resetTimer();
        }
    }, 1000);

    const updateTime = (isCorrect: boolean): void => {
        if (timesUp.value) return;

        if (!isCorrect && counter.value <= step) {
            resetTimer()
        } else {
            counter.value = isCorrect ? counter.value + step : counter.value - step;
        }
    };

    const resetTimer = (): void => {
        clearInterval(interval);
        counter.value = 0;
        timesUp.value = true;
    }

    onUnmounted(() => {
        clearInterval(interval);
    });

    return {
        counter,
        updateTime,
        timesUp,
        step
    }
}