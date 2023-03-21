type PotentiallyErroneousResponse<ExpectedResponse> = {
  error?: string;
  error_description?: string;
} & ExpectedResponse;

type LoadingStatus = 'initial' | 'loading' | 'complete' | 'failed';
