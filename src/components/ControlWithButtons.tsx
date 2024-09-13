import {observer} from "mobx-react-lite";
import { controlStore } from "../store";

function ControlWithButtons() {

    return (
        <>
            <h1>1 контрол</h1>
            <input
                type="text"
                value={controlStore.inputValue}
                onChange={(e) => controlStore.setInputValue(e.target.value)}
            />
            <button onClick={() => controlStore.resetInputValue()}>Reset</button>
            <button onClick={() => controlStore.setInputValue('Hello World!')}>Hello World!</button>

            <h1>2 контрол</h1>
            <button onClick={() => {
                if (typeof +controlStore.inputValue === 'number' &&
                    !isNaN(+controlStore.inputValue) &&
                    controlStore.inputValue.trim() !== ''
                ) {
                    alert(controlStore.inputValue);
                } else {
                    return;
                }
            }}>Check Number</button>
            <input
                type="text"
                value={controlStore.inputValue}
                onChange={(e) => controlStore.setInputValue(e.target.value)}
                placeholder={'Input 2'}
            />
            <button onClick={() => alert(controlStore.inputValue)}>Alert</button>
        </>
    );
}

export default observer(ControlWithButtons);