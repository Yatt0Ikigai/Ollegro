import { closeRedisInstance} from "../trpc/redisServer";

afterAll(() => {
    closeRedisInstance();
})