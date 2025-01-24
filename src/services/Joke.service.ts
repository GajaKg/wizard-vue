import type { Joke } from "@/models/Joke.interface";
import axios, { type AxiosResponse } from "axios";


class JokeService {
    private controller: AbortController | null = null;
    private connect = axios.create({
        baseURL: `https://official-joke-api.appspot.com`
    })

    async getJoke(): Promise<Joke | undefined> {
        // Cancel request if is already exist
        if (this.controller) {
            this.controller.abort();
        }

        // Create a new AbortController
        this.controller = new AbortController();

        try {
            const response: AxiosResponse = await this.connect.get("/random_joke", {
                signal: this.controller.signal, // Attach the AbortController's signal
            });

            if (response.status === 200) {
                return response.data;
            }
        } catch (error: any) {
            if (axios.isCancel(error)) {
                console.warn(error.message);
              } else {
                console.log(error);
                console.log('Error fetching data: ', error.message)
              }
        }
    }
}


export const jokeService = new JokeService();