const PostController = require('../controllers/postController');
const Post = require('../models/postModel');

beforeEach(() => {
    jest.mock('../models/postModel');
    jest.mock('../provider/testApiProvider', () => ({
        getRandomText: jest.fn(() => Promise.resolve('Mocked random text')),
    }));
});

describe('PostController', () => {
    test('Should list all posts', async () => {
        jest.spyOn(Post, 'find').mockResolvedValue([
            {
                title: 'title1',
                content: 'content1',
            },
            {
                title: 'title2',
                content: 'content2',
            },
        ]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await PostController.listAllPosts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([
            {
                title: 'title1',
                content: 'content1',
            },
            {
                title: 'title2',
                content: 'content2',
            },
        ]);
    });

    test('Should create a post', async () => {
        jest.spyOn(Post.prototype, 'save').mockResolvedValue({
            title: 'title3',
            content: 'content3',
        });

        const req = {
            body: {
                title: 'title3',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await PostController.createAPost(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            title: 'title3',
            content: 'content3',
        });
        expect(Post.prototype.save).toHaveBeenCalled();
    });


    test('Should update a post', async () => {
        jest.spyOn(Post, 'findByIdAndUpdate').mockResolvedValue({
            title: 'title1',
            content: 'bonk',
        });

        const req = {
            params: {
                postId: '123456',
            },
            body: {
                title: 'title1',
                content: 'bonk',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await PostController.updatePost(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            title: 'title1',
            content: 'bonk',
        });
    });
});