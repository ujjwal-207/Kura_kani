import { clerkClient } from '@clerk/express';
import {Request, Response} from 'express';

export const signIn = async(req: Request, res: Response) => {
    res.render('/sign-in');
}