const REQUIRED_ENV_VARS = ['JWT_TOKEN_SECRET'];

export const getEnvVar = (name: string): string | undefined => process.env[name];

export const isProductionEnvironment = (): boolean => getEnvVar('NODE_ENV') === 'production';

export const getNonFilledRequiredEnvVars = (): string[] => {
  return REQUIRED_ENV_VARS.filter((requiredEnv) => !getEnvVar(requiredEnv));
};
