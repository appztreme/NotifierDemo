import { watchLoginAsync } from './authentication';

export default function* rootSaga() {
    yield [
        watchLoginAsync(),
    ];
}
