import { closeRedisInstance} from "../trpc/redisServer";

afterAll(() => {
    console.log("Closing Redis Instance")
    closeRedisInstance();
})