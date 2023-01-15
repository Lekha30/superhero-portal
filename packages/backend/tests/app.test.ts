import { constructTestServer } from './utils/server.utils';

describe('graphql status', () => {
  it('should respond with a success message', async () => {
    const { server } = constructTestServer();
    const result = await server.executeOperation({
      query: 'query  { status }',
    });
    expect(result.errors).toBeUndefined();
    expect(result.data?.status).toBe('GrpahQL status: OK');
  });
});
