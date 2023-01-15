import { Resolver, ResolverFn } from '../../typings/generated';

type MockResolverFn<TResult, TParent, TArgs, TCtx> = (
  parent?: TParent,
  args?: TArgs,
  context?: TCtx,
  info?: any,
) => Promise<TResult> | TResult;

// A wrapper to cast Resolver to the callable ResolverFn
export const mockResolver = <TResult, TParent, TContext, TArgs>(
  resolver: Resolver<TResult, TParent, TContext, TArgs> | undefined,
): MockResolverFn<TResult, TParent, TArgs, TContext> => {
  return (parent, args, context, info) => {
    const resolverFn = resolver as ResolverFn<
      TResult,
      TParent,
      TContext,
      TArgs
    >;
    return resolverFn(parent!, args!, context!, info);
  };
};

export const JWT_SECRET = 'SECRET';
