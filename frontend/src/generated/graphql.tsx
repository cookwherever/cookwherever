import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  citext: any;
  float8: any;
  food_data_type_enum: any;
  jsonb: any;
  timestamp: any;
  timestamptz: any;
  tsvector: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Float". All fields are combined with logical 'AND'. */
export type Float_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Float']>;
  _gt?: InputMaybe<Scalars['Float']>;
  _gte?: InputMaybe<Scalars['Float']>;
  _in?: InputMaybe<Array<Scalars['Float']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Float']>;
  _lte?: InputMaybe<Scalars['Float']>;
  _neq?: InputMaybe<Scalars['Float']>;
  _nin?: InputMaybe<Array<Scalars['Float']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "auth.provider_requests" */
export type AuthProviderRequests = {
  __typename?: 'authProviderRequests';
  id: Scalars['uuid'];
  redirectUrl: Scalars['String'];
};

/** aggregated selection of "auth.provider_requests" */
export type AuthProviderRequests_Aggregate = {
  __typename?: 'authProviderRequests_aggregate';
  aggregate?: Maybe<AuthProviderRequests_Aggregate_Fields>;
  nodes: Array<AuthProviderRequests>;
};

/** aggregate fields of "auth.provider_requests" */
export type AuthProviderRequests_Aggregate_Fields = {
  __typename?: 'authProviderRequests_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthProviderRequests_Max_Fields>;
  min?: Maybe<AuthProviderRequests_Min_Fields>;
};


/** aggregate fields of "auth.provider_requests" */
export type AuthProviderRequests_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "auth.provider_requests". All fields are combined with a logical 'AND'. */
export type AuthProviderRequests_Bool_Exp = {
  _and?: InputMaybe<Array<AuthProviderRequests_Bool_Exp>>;
  _not?: InputMaybe<AuthProviderRequests_Bool_Exp>;
  _or?: InputMaybe<Array<AuthProviderRequests_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  redirectUrl?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.provider_requests" */
export enum AuthProviderRequests_Constraint {
  /** unique or primary key constraint */
  ProviderRequestsPkey = 'provider_requests_pkey'
}

/** input type for inserting data into table "auth.provider_requests" */
export type AuthProviderRequests_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  redirectUrl?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type AuthProviderRequests_Max_Fields = {
  __typename?: 'authProviderRequests_max_fields';
  id?: Maybe<Scalars['uuid']>;
  redirectUrl?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type AuthProviderRequests_Min_Fields = {
  __typename?: 'authProviderRequests_min_fields';
  id?: Maybe<Scalars['uuid']>;
  redirectUrl?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "auth.provider_requests" */
export type AuthProviderRequests_Mutation_Response = {
  __typename?: 'authProviderRequests_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthProviderRequests>;
};

/** on conflict condition type for table "auth.provider_requests" */
export type AuthProviderRequests_On_Conflict = {
  constraint: AuthProviderRequests_Constraint;
  update_columns?: Array<AuthProviderRequests_Update_Column>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.provider_requests". */
export type AuthProviderRequests_Order_By = {
  id?: InputMaybe<Order_By>;
  redirectUrl?: InputMaybe<Order_By>;
};

/** primary key columns input for table: authProviderRequests */
export type AuthProviderRequests_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "auth.provider_requests" */
export enum AuthProviderRequests_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  RedirectUrl = 'redirectUrl'
}

/** input type for updating data in table "auth.provider_requests" */
export type AuthProviderRequests_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  redirectUrl?: InputMaybe<Scalars['String']>;
};

/** update columns of table "auth.provider_requests" */
export enum AuthProviderRequests_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  RedirectUrl = 'redirectUrl'
}

/** columns and relationships of "auth.providers" */
export type AuthProviders = {
  __typename?: 'authProviders';
  id: Scalars['String'];
  /** An array relationship */
  userProviders: Array<AuthUserProviders>;
  /** An aggregate relationship */
  userProviders_aggregate: AuthUserProviders_Aggregate;
};


/** columns and relationships of "auth.providers" */
export type AuthProvidersUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


/** columns and relationships of "auth.providers" */
export type AuthProvidersUserProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};

/** aggregated selection of "auth.providers" */
export type AuthProviders_Aggregate = {
  __typename?: 'authProviders_aggregate';
  aggregate?: Maybe<AuthProviders_Aggregate_Fields>;
  nodes: Array<AuthProviders>;
};

/** aggregate fields of "auth.providers" */
export type AuthProviders_Aggregate_Fields = {
  __typename?: 'authProviders_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthProviders_Max_Fields>;
  min?: Maybe<AuthProviders_Min_Fields>;
};


/** aggregate fields of "auth.providers" */
export type AuthProviders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthProviders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "auth.providers". All fields are combined with a logical 'AND'. */
export type AuthProviders_Bool_Exp = {
  _and?: InputMaybe<Array<AuthProviders_Bool_Exp>>;
  _not?: InputMaybe<AuthProviders_Bool_Exp>;
  _or?: InputMaybe<Array<AuthProviders_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  userProviders?: InputMaybe<AuthUserProviders_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.providers" */
export enum AuthProviders_Constraint {
  /** unique or primary key constraint */
  ProvidersPkey = 'providers_pkey'
}

/** input type for inserting data into table "auth.providers" */
export type AuthProviders_Insert_Input = {
  id?: InputMaybe<Scalars['String']>;
  userProviders?: InputMaybe<AuthUserProviders_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type AuthProviders_Max_Fields = {
  __typename?: 'authProviders_max_fields';
  id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type AuthProviders_Min_Fields = {
  __typename?: 'authProviders_min_fields';
  id?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "auth.providers" */
export type AuthProviders_Mutation_Response = {
  __typename?: 'authProviders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthProviders>;
};

/** input type for inserting object relation for remote table "auth.providers" */
export type AuthProviders_Obj_Rel_Insert_Input = {
  data: AuthProviders_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<AuthProviders_On_Conflict>;
};

/** on conflict condition type for table "auth.providers" */
export type AuthProviders_On_Conflict = {
  constraint: AuthProviders_Constraint;
  update_columns?: Array<AuthProviders_Update_Column>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.providers". */
export type AuthProviders_Order_By = {
  id?: InputMaybe<Order_By>;
  userProviders_aggregate?: InputMaybe<AuthUserProviders_Aggregate_Order_By>;
};

/** primary key columns input for table: authProviders */
export type AuthProviders_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "auth.providers" */
export enum AuthProviders_Select_Column {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "auth.providers" */
export type AuthProviders_Set_Input = {
  id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "auth.providers" */
export enum AuthProviders_Update_Column {
  /** column name */
  Id = 'id'
}

/** columns and relationships of "auth.refresh_tokens" */
export type AuthRefreshTokens = {
  __typename?: 'authRefreshTokens';
  createdAt: Scalars['timestamptz'];
  expiresAt: Scalars['timestamptz'];
  refreshToken: Scalars['uuid'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate = {
  __typename?: 'authRefreshTokens_aggregate';
  aggregate?: Maybe<AuthRefreshTokens_Aggregate_Fields>;
  nodes: Array<AuthRefreshTokens>;
};

/** aggregate fields of "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate_Fields = {
  __typename?: 'authRefreshTokens_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthRefreshTokens_Max_Fields>;
  min?: Maybe<AuthRefreshTokens_Min_Fields>;
};


/** aggregate fields of "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthRefreshTokens_Max_Order_By>;
  min?: InputMaybe<AuthRefreshTokens_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.refresh_tokens" */
export type AuthRefreshTokens_Arr_Rel_Insert_Input = {
  data: Array<AuthRefreshTokens_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<AuthRefreshTokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.refresh_tokens". All fields are combined with a logical 'AND'. */
export type AuthRefreshTokens_Bool_Exp = {
  _and?: InputMaybe<Array<AuthRefreshTokens_Bool_Exp>>;
  _not?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
  _or?: InputMaybe<Array<AuthRefreshTokens_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  expiresAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  refreshToken?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Constraint {
  /** unique or primary key constraint */
  RefreshTokensPkey = 'refresh_tokens_pkey'
}

/** input type for inserting data into table "auth.refresh_tokens" */
export type AuthRefreshTokens_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']>;
  refreshToken?: InputMaybe<Scalars['uuid']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthRefreshTokens_Max_Fields = {
  __typename?: 'authRefreshTokens_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  refreshToken?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthRefreshTokens_Min_Fields = {
  __typename?: 'authRefreshTokens_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  expiresAt?: Maybe<Scalars['timestamptz']>;
  refreshToken?: Maybe<Scalars['uuid']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.refresh_tokens" */
export type AuthRefreshTokens_Mutation_Response = {
  __typename?: 'authRefreshTokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthRefreshTokens>;
};

/** on conflict condition type for table "auth.refresh_tokens" */
export type AuthRefreshTokens_On_Conflict = {
  constraint: AuthRefreshTokens_Constraint;
  update_columns?: Array<AuthRefreshTokens_Update_Column>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.refresh_tokens". */
export type AuthRefreshTokens_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  expiresAt?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: authRefreshTokens */
export type AuthRefreshTokens_Pk_Columns_Input = {
  refreshToken: Scalars['uuid'];
};

/** select columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.refresh_tokens" */
export type AuthRefreshTokens_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expiresAt?: InputMaybe<Scalars['timestamptz']>;
  refreshToken?: InputMaybe<Scalars['uuid']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokens_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "auth.roles" */
export type AuthRoles = {
  __typename?: 'authRoles';
  role: Scalars['String'];
  /** An array relationship */
  userRoles: Array<AuthUserRoles>;
  /** An aggregate relationship */
  userRoles_aggregate: AuthUserRoles_Aggregate;
  /** An array relationship */
  usersByDefaultRole: Array<Users>;
  /** An aggregate relationship */
  usersByDefaultRole_aggregate: Users_Aggregate;
};


/** columns and relationships of "auth.roles" */
export type AuthRolesUserRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** columns and relationships of "auth.roles" */
export type AuthRolesUserRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** columns and relationships of "auth.roles" */
export type AuthRolesUsersByDefaultRoleArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** columns and relationships of "auth.roles" */
export type AuthRolesUsersByDefaultRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** aggregated selection of "auth.roles" */
export type AuthRoles_Aggregate = {
  __typename?: 'authRoles_aggregate';
  aggregate?: Maybe<AuthRoles_Aggregate_Fields>;
  nodes: Array<AuthRoles>;
};

/** aggregate fields of "auth.roles" */
export type AuthRoles_Aggregate_Fields = {
  __typename?: 'authRoles_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthRoles_Max_Fields>;
  min?: Maybe<AuthRoles_Min_Fields>;
};


/** aggregate fields of "auth.roles" */
export type AuthRoles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "auth.roles". All fields are combined with a logical 'AND'. */
export type AuthRoles_Bool_Exp = {
  _and?: InputMaybe<Array<AuthRoles_Bool_Exp>>;
  _not?: InputMaybe<AuthRoles_Bool_Exp>;
  _or?: InputMaybe<Array<AuthRoles_Bool_Exp>>;
  role?: InputMaybe<String_Comparison_Exp>;
  userRoles?: InputMaybe<AuthUserRoles_Bool_Exp>;
  usersByDefaultRole?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.roles" */
export enum AuthRoles_Constraint {
  /** unique or primary key constraint */
  RolesPkey = 'roles_pkey'
}

/** input type for inserting data into table "auth.roles" */
export type AuthRoles_Insert_Input = {
  role?: InputMaybe<Scalars['String']>;
  userRoles?: InputMaybe<AuthUserRoles_Arr_Rel_Insert_Input>;
  usersByDefaultRole?: InputMaybe<Users_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type AuthRoles_Max_Fields = {
  __typename?: 'authRoles_max_fields';
  role?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type AuthRoles_Min_Fields = {
  __typename?: 'authRoles_min_fields';
  role?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "auth.roles" */
export type AuthRoles_Mutation_Response = {
  __typename?: 'authRoles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthRoles>;
};

/** input type for inserting object relation for remote table "auth.roles" */
export type AuthRoles_Obj_Rel_Insert_Input = {
  data: AuthRoles_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<AuthRoles_On_Conflict>;
};

/** on conflict condition type for table "auth.roles" */
export type AuthRoles_On_Conflict = {
  constraint: AuthRoles_Constraint;
  update_columns?: Array<AuthRoles_Update_Column>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.roles". */
export type AuthRoles_Order_By = {
  role?: InputMaybe<Order_By>;
  userRoles_aggregate?: InputMaybe<AuthUserRoles_Aggregate_Order_By>;
  usersByDefaultRole_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
};

/** primary key columns input for table: authRoles */
export type AuthRoles_Pk_Columns_Input = {
  role: Scalars['String'];
};

/** select columns of table "auth.roles" */
export enum AuthRoles_Select_Column {
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "auth.roles" */
export type AuthRoles_Set_Input = {
  role?: InputMaybe<Scalars['String']>;
};

/** update columns of table "auth.roles" */
export enum AuthRoles_Update_Column {
  /** column name */
  Role = 'role'
}

/** columns and relationships of "auth.user_providers" */
export type AuthUserProviders = {
  __typename?: 'authUserProviders';
  accessToken: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  provider: AuthProviders;
  providerId: Scalars['String'];
  providerUserId: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.user_providers" */
export type AuthUserProviders_Aggregate = {
  __typename?: 'authUserProviders_aggregate';
  aggregate?: Maybe<AuthUserProviders_Aggregate_Fields>;
  nodes: Array<AuthUserProviders>;
};

/** aggregate fields of "auth.user_providers" */
export type AuthUserProviders_Aggregate_Fields = {
  __typename?: 'authUserProviders_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthUserProviders_Max_Fields>;
  min?: Maybe<AuthUserProviders_Min_Fields>;
};


/** aggregate fields of "auth.user_providers" */
export type AuthUserProviders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.user_providers" */
export type AuthUserProviders_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthUserProviders_Max_Order_By>;
  min?: InputMaybe<AuthUserProviders_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_providers" */
export type AuthUserProviders_Arr_Rel_Insert_Input = {
  data: Array<AuthUserProviders_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<AuthUserProviders_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.user_providers". All fields are combined with a logical 'AND'. */
export type AuthUserProviders_Bool_Exp = {
  _and?: InputMaybe<Array<AuthUserProviders_Bool_Exp>>;
  _not?: InputMaybe<AuthUserProviders_Bool_Exp>;
  _or?: InputMaybe<Array<AuthUserProviders_Bool_Exp>>;
  accessToken?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  provider?: InputMaybe<AuthProviders_Bool_Exp>;
  providerId?: InputMaybe<String_Comparison_Exp>;
  providerUserId?: InputMaybe<String_Comparison_Exp>;
  refreshToken?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.user_providers" */
export enum AuthUserProviders_Constraint {
  /** unique or primary key constraint */
  UserProvidersPkey = 'user_providers_pkey',
  /** unique or primary key constraint */
  UserProvidersProviderIdProviderUserIdKey = 'user_providers_provider_id_provider_user_id_key',
  /** unique or primary key constraint */
  UserProvidersUserIdProviderIdKey = 'user_providers_user_id_provider_id_key'
}

/** input type for inserting data into table "auth.user_providers" */
export type AuthUserProviders_Insert_Input = {
  accessToken?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  provider?: InputMaybe<AuthProviders_Obj_Rel_Insert_Input>;
  providerId?: InputMaybe<Scalars['String']>;
  providerUserId?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthUserProviders_Max_Fields = {
  __typename?: 'authUserProviders_max_fields';
  accessToken?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  providerId?: Maybe<Scalars['String']>;
  providerUserId?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "auth.user_providers" */
export type AuthUserProviders_Max_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  providerId?: InputMaybe<Order_By>;
  providerUserId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthUserProviders_Min_Fields = {
  __typename?: 'authUserProviders_min_fields';
  accessToken?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  providerId?: Maybe<Scalars['String']>;
  providerUserId?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "auth.user_providers" */
export type AuthUserProviders_Min_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  providerId?: InputMaybe<Order_By>;
  providerUserId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.user_providers" */
export type AuthUserProviders_Mutation_Response = {
  __typename?: 'authUserProviders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserProviders>;
};

/** on conflict condition type for table "auth.user_providers" */
export type AuthUserProviders_On_Conflict = {
  constraint: AuthUserProviders_Constraint;
  update_columns?: Array<AuthUserProviders_Update_Column>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.user_providers". */
export type AuthUserProviders_Order_By = {
  accessToken?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  provider?: InputMaybe<AuthProviders_Order_By>;
  providerId?: InputMaybe<Order_By>;
  providerUserId?: InputMaybe<Order_By>;
  refreshToken?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: authUserProviders */
export type AuthUserProviders_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "auth.user_providers" */
export enum AuthUserProviders_Select_Column {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  ProviderUserId = 'providerUserId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_providers" */
export type AuthUserProviders_Set_Input = {
  accessToken?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  providerId?: InputMaybe<Scalars['String']>;
  providerUserId?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "auth.user_providers" */
export enum AuthUserProviders_Update_Column {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  ProviderUserId = 'providerUserId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "auth.user_roles" */
export type AuthUserRoles = {
  __typename?: 'authUserRoles';
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  role: Scalars['String'];
  /** An object relationship */
  roleByRole: AuthRoles;
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.user_roles" */
export type AuthUserRoles_Aggregate = {
  __typename?: 'authUserRoles_aggregate';
  aggregate?: Maybe<AuthUserRoles_Aggregate_Fields>;
  nodes: Array<AuthUserRoles>;
};

/** aggregate fields of "auth.user_roles" */
export type AuthUserRoles_Aggregate_Fields = {
  __typename?: 'authUserRoles_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AuthUserRoles_Max_Fields>;
  min?: Maybe<AuthUserRoles_Min_Fields>;
};


/** aggregate fields of "auth.user_roles" */
export type AuthUserRoles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.user_roles" */
export type AuthUserRoles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AuthUserRoles_Max_Order_By>;
  min?: InputMaybe<AuthUserRoles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_roles" */
export type AuthUserRoles_Arr_Rel_Insert_Input = {
  data: Array<AuthUserRoles_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<AuthUserRoles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.user_roles". All fields are combined with a logical 'AND'. */
export type AuthUserRoles_Bool_Exp = {
  _and?: InputMaybe<Array<AuthUserRoles_Bool_Exp>>;
  _not?: InputMaybe<AuthUserRoles_Bool_Exp>;
  _or?: InputMaybe<Array<AuthUserRoles_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  roleByRole?: InputMaybe<AuthRoles_Bool_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "auth.user_roles" */
export enum AuthUserRoles_Constraint {
  /** unique or primary key constraint */
  UserRolesPkey = 'user_roles_pkey',
  /** unique or primary key constraint */
  UserRolesUserIdRoleKey = 'user_roles_user_id_role_key'
}

/** input type for inserting data into table "auth.user_roles" */
export type AuthUserRoles_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  roleByRole?: InputMaybe<AuthRoles_Obj_Rel_Insert_Input>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthUserRoles_Max_Fields = {
  __typename?: 'authUserRoles_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  role?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "auth.user_roles" */
export type AuthUserRoles_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AuthUserRoles_Min_Fields = {
  __typename?: 'authUserRoles_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  role?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "auth.user_roles" */
export type AuthUserRoles_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.user_roles" */
export type AuthUserRoles_Mutation_Response = {
  __typename?: 'authUserRoles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserRoles>;
};

/** on conflict condition type for table "auth.user_roles" */
export type AuthUserRoles_On_Conflict = {
  constraint: AuthUserRoles_Constraint;
  update_columns?: Array<AuthUserRoles_Update_Column>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.user_roles". */
export type AuthUserRoles_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  roleByRole?: InputMaybe<AuthRoles_Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: authUserRoles */
export type AuthUserRoles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "auth.user_roles" */
export enum AuthUserRoles_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_roles" */
export type AuthUserRoles_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "auth.user_roles" */
export enum AuthUserRoles_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId'
}

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** Boolean expression to compare columns of type "citext". All fields are combined with logical 'AND'. */
export type Citext_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['citext']>;
  _gt?: InputMaybe<Scalars['citext']>;
  _gte?: InputMaybe<Scalars['citext']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['citext']>;
  _in?: InputMaybe<Array<Scalars['citext']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['citext']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['citext']>;
  _lt?: InputMaybe<Scalars['citext']>;
  _lte?: InputMaybe<Scalars['citext']>;
  _neq?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['citext']>;
  _nin?: InputMaybe<Array<Scalars['citext']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['citext']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['citext']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['citext']>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']>;
  _gt?: InputMaybe<Scalars['float8']>;
  _gte?: InputMaybe<Scalars['float8']>;
  _in?: InputMaybe<Array<Scalars['float8']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['float8']>;
  _lte?: InputMaybe<Scalars['float8']>;
  _neq?: InputMaybe<Scalars['float8']>;
  _nin?: InputMaybe<Array<Scalars['float8']>>;
};

/** columns and relationships of "food" */
export type Food = {
  __typename?: 'food';
  data_type?: Maybe<Scalars['food_data_type_enum']>;
  description?: Maybe<Scalars['String']>;
  description_tsv?: Maybe<Scalars['tsvector']>;
  fdc_id: Scalars['Int'];
  /** An array relationship */
  food_attributes: Array<Food_Attribute>;
  /** An aggregate relationship */
  food_attributes_aggregate: Food_Attribute_Aggregate;
  /** An object relationship */
  food_category?: Maybe<Food_Category>;
  food_category_id?: Maybe<Scalars['Int']>;
  /** An array relationship */
  food_nutrients: Array<Food_Nutrient>;
  /** An aggregate relationship */
  food_nutrients_aggregate: Food_Nutrient_Aggregate;
  /** An array relationship */
  food_portions: Array<Food_Portion>;
  /** An aggregate relationship */
  food_portions_aggregate: Food_Portion_Aggregate;
  publication_date?: Maybe<Scalars['timestamp']>;
};


/** columns and relationships of "food" */
export type FoodFood_AttributesArgs = {
  distinct_on?: InputMaybe<Array<Food_Attribute_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Attribute_Order_By>>;
  where?: InputMaybe<Food_Attribute_Bool_Exp>;
};


/** columns and relationships of "food" */
export type FoodFood_Attributes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Attribute_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Attribute_Order_By>>;
  where?: InputMaybe<Food_Attribute_Bool_Exp>;
};


/** columns and relationships of "food" */
export type FoodFood_NutrientsArgs = {
  distinct_on?: InputMaybe<Array<Food_Nutrient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Nutrient_Order_By>>;
  where?: InputMaybe<Food_Nutrient_Bool_Exp>;
};


/** columns and relationships of "food" */
export type FoodFood_Nutrients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Nutrient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Nutrient_Order_By>>;
  where?: InputMaybe<Food_Nutrient_Bool_Exp>;
};


/** columns and relationships of "food" */
export type FoodFood_PortionsArgs = {
  distinct_on?: InputMaybe<Array<Food_Portion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Portion_Order_By>>;
  where?: InputMaybe<Food_Portion_Bool_Exp>;
};


/** columns and relationships of "food" */
export type FoodFood_Portions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Portion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Portion_Order_By>>;
  where?: InputMaybe<Food_Portion_Bool_Exp>;
};

/** aggregated selection of "food" */
export type Food_Aggregate = {
  __typename?: 'food_aggregate';
  aggregate?: Maybe<Food_Aggregate_Fields>;
  nodes: Array<Food>;
};

/** aggregate fields of "food" */
export type Food_Aggregate_Fields = {
  __typename?: 'food_aggregate_fields';
  avg?: Maybe<Food_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Food_Max_Fields>;
  min?: Maybe<Food_Min_Fields>;
  stddev?: Maybe<Food_Stddev_Fields>;
  stddev_pop?: Maybe<Food_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Food_Stddev_Samp_Fields>;
  sum?: Maybe<Food_Sum_Fields>;
  var_pop?: Maybe<Food_Var_Pop_Fields>;
  var_samp?: Maybe<Food_Var_Samp_Fields>;
  variance?: Maybe<Food_Variance_Fields>;
};


/** aggregate fields of "food" */
export type Food_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Food_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "food" */
export type Food_Aggregate_Order_By = {
  avg?: InputMaybe<Food_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Food_Max_Order_By>;
  min?: InputMaybe<Food_Min_Order_By>;
  stddev?: InputMaybe<Food_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Food_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Food_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Food_Sum_Order_By>;
  var_pop?: InputMaybe<Food_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Food_Var_Samp_Order_By>;
  variance?: InputMaybe<Food_Variance_Order_By>;
};

/** columns and relationships of "food_attribute" */
export type Food_Attribute = {
  __typename?: 'food_attribute';
  fdc_id?: Maybe<Scalars['Int']>;
  /** An object relationship */
  food_attribute_type?: Maybe<Food_Attribute_Type>;
  food_attribute_type_id?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  seq_num?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregated selection of "food_attribute" */
export type Food_Attribute_Aggregate = {
  __typename?: 'food_attribute_aggregate';
  aggregate?: Maybe<Food_Attribute_Aggregate_Fields>;
  nodes: Array<Food_Attribute>;
};

/** aggregate fields of "food_attribute" */
export type Food_Attribute_Aggregate_Fields = {
  __typename?: 'food_attribute_aggregate_fields';
  avg?: Maybe<Food_Attribute_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Food_Attribute_Max_Fields>;
  min?: Maybe<Food_Attribute_Min_Fields>;
  stddev?: Maybe<Food_Attribute_Stddev_Fields>;
  stddev_pop?: Maybe<Food_Attribute_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Food_Attribute_Stddev_Samp_Fields>;
  sum?: Maybe<Food_Attribute_Sum_Fields>;
  var_pop?: Maybe<Food_Attribute_Var_Pop_Fields>;
  var_samp?: Maybe<Food_Attribute_Var_Samp_Fields>;
  variance?: Maybe<Food_Attribute_Variance_Fields>;
};


/** aggregate fields of "food_attribute" */
export type Food_Attribute_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Food_Attribute_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "food_attribute" */
export type Food_Attribute_Aggregate_Order_By = {
  avg?: InputMaybe<Food_Attribute_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Food_Attribute_Max_Order_By>;
  min?: InputMaybe<Food_Attribute_Min_Order_By>;
  stddev?: InputMaybe<Food_Attribute_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Food_Attribute_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Food_Attribute_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Food_Attribute_Sum_Order_By>;
  var_pop?: InputMaybe<Food_Attribute_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Food_Attribute_Var_Samp_Order_By>;
  variance?: InputMaybe<Food_Attribute_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "food_attribute" */
export type Food_Attribute_Arr_Rel_Insert_Input = {
  data: Array<Food_Attribute_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Food_Attribute_On_Conflict>;
};

/** aggregate avg on columns */
export type Food_Attribute_Avg_Fields = {
  __typename?: 'food_attribute_avg_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_attribute_type_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "food_attribute" */
export type Food_Attribute_Avg_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "food_attribute". All fields are combined with a logical 'AND'. */
export type Food_Attribute_Bool_Exp = {
  _and?: InputMaybe<Array<Food_Attribute_Bool_Exp>>;
  _not?: InputMaybe<Food_Attribute_Bool_Exp>;
  _or?: InputMaybe<Array<Food_Attribute_Bool_Exp>>;
  fdc_id?: InputMaybe<Int_Comparison_Exp>;
  food_attribute_type?: InputMaybe<Food_Attribute_Type_Bool_Exp>;
  food_attribute_type_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  seq_num?: InputMaybe<Int_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "food_attribute" */
export enum Food_Attribute_Constraint {
  /** unique or primary key constraint */
  FoodAttributePkey = 'food_attribute_pkey'
}

/** input type for incrementing numeric columns in table "food_attribute" */
export type Food_Attribute_Inc_Input = {
  fdc_id?: InputMaybe<Scalars['Int']>;
  food_attribute_type_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "food_attribute" */
export type Food_Attribute_Insert_Input = {
  fdc_id?: InputMaybe<Scalars['Int']>;
  food_attribute_type?: InputMaybe<Food_Attribute_Type_Obj_Rel_Insert_Input>;
  food_attribute_type_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  seq_num?: InputMaybe<Scalars['Int']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Food_Attribute_Max_Fields = {
  __typename?: 'food_attribute_max_fields';
  fdc_id?: Maybe<Scalars['Int']>;
  food_attribute_type_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  seq_num?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "food_attribute" */
export type Food_Attribute_Max_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Food_Attribute_Min_Fields = {
  __typename?: 'food_attribute_min_fields';
  fdc_id?: Maybe<Scalars['Int']>;
  food_attribute_type_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  seq_num?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "food_attribute" */
export type Food_Attribute_Min_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "food_attribute" */
export type Food_Attribute_Mutation_Response = {
  __typename?: 'food_attribute_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Food_Attribute>;
};

/** on conflict condition type for table "food_attribute" */
export type Food_Attribute_On_Conflict = {
  constraint: Food_Attribute_Constraint;
  update_columns?: Array<Food_Attribute_Update_Column>;
  where?: InputMaybe<Food_Attribute_Bool_Exp>;
};

/** Ordering options when selecting data from "food_attribute". */
export type Food_Attribute_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type?: InputMaybe<Food_Attribute_Type_Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: food_attribute */
export type Food_Attribute_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "food_attribute" */
export enum Food_Attribute_Select_Column {
  /** column name */
  FdcId = 'fdc_id',
  /** column name */
  FoodAttributeTypeId = 'food_attribute_type_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SeqNum = 'seq_num',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "food_attribute" */
export type Food_Attribute_Set_Input = {
  fdc_id?: InputMaybe<Scalars['Int']>;
  food_attribute_type_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  seq_num?: InputMaybe<Scalars['Int']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Food_Attribute_Stddev_Fields = {
  __typename?: 'food_attribute_stddev_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_attribute_type_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "food_attribute" */
export type Food_Attribute_Stddev_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Food_Attribute_Stddev_Pop_Fields = {
  __typename?: 'food_attribute_stddev_pop_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_attribute_type_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "food_attribute" */
export type Food_Attribute_Stddev_Pop_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Food_Attribute_Stddev_Samp_Fields = {
  __typename?: 'food_attribute_stddev_samp_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_attribute_type_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "food_attribute" */
export type Food_Attribute_Stddev_Samp_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Food_Attribute_Sum_Fields = {
  __typename?: 'food_attribute_sum_fields';
  fdc_id?: Maybe<Scalars['Int']>;
  food_attribute_type_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "food_attribute" */
export type Food_Attribute_Sum_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** columns and relationships of "food_attribute_type" */
export type Food_Attribute_Type = {
  __typename?: 'food_attribute_type';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

/** aggregated selection of "food_attribute_type" */
export type Food_Attribute_Type_Aggregate = {
  __typename?: 'food_attribute_type_aggregate';
  aggregate?: Maybe<Food_Attribute_Type_Aggregate_Fields>;
  nodes: Array<Food_Attribute_Type>;
};

/** aggregate fields of "food_attribute_type" */
export type Food_Attribute_Type_Aggregate_Fields = {
  __typename?: 'food_attribute_type_aggregate_fields';
  avg?: Maybe<Food_Attribute_Type_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Food_Attribute_Type_Max_Fields>;
  min?: Maybe<Food_Attribute_Type_Min_Fields>;
  stddev?: Maybe<Food_Attribute_Type_Stddev_Fields>;
  stddev_pop?: Maybe<Food_Attribute_Type_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Food_Attribute_Type_Stddev_Samp_Fields>;
  sum?: Maybe<Food_Attribute_Type_Sum_Fields>;
  var_pop?: Maybe<Food_Attribute_Type_Var_Pop_Fields>;
  var_samp?: Maybe<Food_Attribute_Type_Var_Samp_Fields>;
  variance?: Maybe<Food_Attribute_Type_Variance_Fields>;
};


/** aggregate fields of "food_attribute_type" */
export type Food_Attribute_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Food_Attribute_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Food_Attribute_Type_Avg_Fields = {
  __typename?: 'food_attribute_type_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "food_attribute_type". All fields are combined with a logical 'AND'. */
export type Food_Attribute_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Food_Attribute_Type_Bool_Exp>>;
  _not?: InputMaybe<Food_Attribute_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Food_Attribute_Type_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "food_attribute_type" */
export enum Food_Attribute_Type_Constraint {
  /** unique or primary key constraint */
  FoodAttributeTypePkey = 'food_attribute_type_pkey'
}

/** input type for incrementing numeric columns in table "food_attribute_type" */
export type Food_Attribute_Type_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "food_attribute_type" */
export type Food_Attribute_Type_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Food_Attribute_Type_Max_Fields = {
  __typename?: 'food_attribute_type_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Food_Attribute_Type_Min_Fields = {
  __typename?: 'food_attribute_type_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "food_attribute_type" */
export type Food_Attribute_Type_Mutation_Response = {
  __typename?: 'food_attribute_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Food_Attribute_Type>;
};

/** input type for inserting object relation for remote table "food_attribute_type" */
export type Food_Attribute_Type_Obj_Rel_Insert_Input = {
  data: Food_Attribute_Type_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Food_Attribute_Type_On_Conflict>;
};

/** on conflict condition type for table "food_attribute_type" */
export type Food_Attribute_Type_On_Conflict = {
  constraint: Food_Attribute_Type_Constraint;
  update_columns?: Array<Food_Attribute_Type_Update_Column>;
  where?: InputMaybe<Food_Attribute_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "food_attribute_type". */
export type Food_Attribute_Type_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: food_attribute_type */
export type Food_Attribute_Type_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "food_attribute_type" */
export enum Food_Attribute_Type_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "food_attribute_type" */
export type Food_Attribute_Type_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Food_Attribute_Type_Stddev_Fields = {
  __typename?: 'food_attribute_type_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Food_Attribute_Type_Stddev_Pop_Fields = {
  __typename?: 'food_attribute_type_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Food_Attribute_Type_Stddev_Samp_Fields = {
  __typename?: 'food_attribute_type_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Food_Attribute_Type_Sum_Fields = {
  __typename?: 'food_attribute_type_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "food_attribute_type" */
export enum Food_Attribute_Type_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Food_Attribute_Type_Var_Pop_Fields = {
  __typename?: 'food_attribute_type_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Food_Attribute_Type_Var_Samp_Fields = {
  __typename?: 'food_attribute_type_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Food_Attribute_Type_Variance_Fields = {
  __typename?: 'food_attribute_type_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** update columns of table "food_attribute" */
export enum Food_Attribute_Update_Column {
  /** column name */
  FdcId = 'fdc_id',
  /** column name */
  FoodAttributeTypeId = 'food_attribute_type_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SeqNum = 'seq_num',
  /** column name */
  Value = 'value'
}

/** aggregate var_pop on columns */
export type Food_Attribute_Var_Pop_Fields = {
  __typename?: 'food_attribute_var_pop_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_attribute_type_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "food_attribute" */
export type Food_Attribute_Var_Pop_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Food_Attribute_Var_Samp_Fields = {
  __typename?: 'food_attribute_var_samp_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_attribute_type_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "food_attribute" */
export type Food_Attribute_Var_Samp_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Food_Attribute_Variance_Fields = {
  __typename?: 'food_attribute_variance_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_attribute_type_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "food_attribute" */
export type Food_Attribute_Variance_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_attribute_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate avg on columns */
export type Food_Avg_Fields = {
  __typename?: 'food_avg_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_category_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "food" */
export type Food_Avg_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_category_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "food". All fields are combined with a logical 'AND'. */
export type Food_Bool_Exp = {
  _and?: InputMaybe<Array<Food_Bool_Exp>>;
  _not?: InputMaybe<Food_Bool_Exp>;
  _or?: InputMaybe<Array<Food_Bool_Exp>>;
  data_type?: InputMaybe<Food_Data_Type_Enum_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  description_tsv?: InputMaybe<Tsvector_Comparison_Exp>;
  fdc_id?: InputMaybe<Int_Comparison_Exp>;
  food_attributes?: InputMaybe<Food_Attribute_Bool_Exp>;
  food_category?: InputMaybe<Food_Category_Bool_Exp>;
  food_category_id?: InputMaybe<Int_Comparison_Exp>;
  food_nutrients?: InputMaybe<Food_Nutrient_Bool_Exp>;
  food_portions?: InputMaybe<Food_Portion_Bool_Exp>;
  publication_date?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** columns and relationships of "food_category" */
export type Food_Category = {
  __typename?: 'food_category';
  code?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** aggregated selection of "food_category" */
export type Food_Category_Aggregate = {
  __typename?: 'food_category_aggregate';
  aggregate?: Maybe<Food_Category_Aggregate_Fields>;
  nodes: Array<Food_Category>;
};

/** aggregate fields of "food_category" */
export type Food_Category_Aggregate_Fields = {
  __typename?: 'food_category_aggregate_fields';
  avg?: Maybe<Food_Category_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Food_Category_Max_Fields>;
  min?: Maybe<Food_Category_Min_Fields>;
  stddev?: Maybe<Food_Category_Stddev_Fields>;
  stddev_pop?: Maybe<Food_Category_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Food_Category_Stddev_Samp_Fields>;
  sum?: Maybe<Food_Category_Sum_Fields>;
  var_pop?: Maybe<Food_Category_Var_Pop_Fields>;
  var_samp?: Maybe<Food_Category_Var_Samp_Fields>;
  variance?: Maybe<Food_Category_Variance_Fields>;
};


/** aggregate fields of "food_category" */
export type Food_Category_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Food_Category_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Food_Category_Avg_Fields = {
  __typename?: 'food_category_avg_fields';
  code?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "food_category". All fields are combined with a logical 'AND'. */
export type Food_Category_Bool_Exp = {
  _and?: InputMaybe<Array<Food_Category_Bool_Exp>>;
  _not?: InputMaybe<Food_Category_Bool_Exp>;
  _or?: InputMaybe<Array<Food_Category_Bool_Exp>>;
  code?: InputMaybe<Int_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "food_category" */
export enum Food_Category_Constraint {
  /** unique or primary key constraint */
  FoodCategoryPkey = 'food_category_pkey'
}

/** input type for incrementing numeric columns in table "food_category" */
export type Food_Category_Inc_Input = {
  code?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "food_category" */
export type Food_Category_Insert_Input = {
  code?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Food_Category_Max_Fields = {
  __typename?: 'food_category_max_fields';
  code?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Food_Category_Min_Fields = {
  __typename?: 'food_category_min_fields';
  code?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "food_category" */
export type Food_Category_Mutation_Response = {
  __typename?: 'food_category_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Food_Category>;
};

/** input type for inserting object relation for remote table "food_category" */
export type Food_Category_Obj_Rel_Insert_Input = {
  data: Food_Category_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Food_Category_On_Conflict>;
};

/** on conflict condition type for table "food_category" */
export type Food_Category_On_Conflict = {
  constraint: Food_Category_Constraint;
  update_columns?: Array<Food_Category_Update_Column>;
  where?: InputMaybe<Food_Category_Bool_Exp>;
};

/** Ordering options when selecting data from "food_category". */
export type Food_Category_Order_By = {
  code?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: food_category */
export type Food_Category_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "food_category" */
export enum Food_Category_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "food_category" */
export type Food_Category_Set_Input = {
  code?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Food_Category_Stddev_Fields = {
  __typename?: 'food_category_stddev_fields';
  code?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Food_Category_Stddev_Pop_Fields = {
  __typename?: 'food_category_stddev_pop_fields';
  code?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Food_Category_Stddev_Samp_Fields = {
  __typename?: 'food_category_stddev_samp_fields';
  code?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Food_Category_Sum_Fields = {
  __typename?: 'food_category_sum_fields';
  code?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "food_category" */
export enum Food_Category_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id'
}

/** aggregate var_pop on columns */
export type Food_Category_Var_Pop_Fields = {
  __typename?: 'food_category_var_pop_fields';
  code?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Food_Category_Var_Samp_Fields = {
  __typename?: 'food_category_var_samp_fields';
  code?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Food_Category_Variance_Fields = {
  __typename?: 'food_category_variance_fields';
  code?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** unique or primary key constraints on table "food" */
export enum Food_Constraint {
  /** unique or primary key constraint */
  FoodPkey = 'food_pkey'
}

/** Boolean expression to compare columns of type "food_data_type_enum". All fields are combined with logical 'AND'. */
export type Food_Data_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['food_data_type_enum']>;
  _gt?: InputMaybe<Scalars['food_data_type_enum']>;
  _gte?: InputMaybe<Scalars['food_data_type_enum']>;
  _in?: InputMaybe<Array<Scalars['food_data_type_enum']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['food_data_type_enum']>;
  _lte?: InputMaybe<Scalars['food_data_type_enum']>;
  _neq?: InputMaybe<Scalars['food_data_type_enum']>;
  _nin?: InputMaybe<Array<Scalars['food_data_type_enum']>>;
};

/** input type for incrementing numeric columns in table "food" */
export type Food_Inc_Input = {
  fdc_id?: InputMaybe<Scalars['Int']>;
  food_category_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "food" */
export type Food_Insert_Input = {
  data_type?: InputMaybe<Scalars['food_data_type_enum']>;
  description?: InputMaybe<Scalars['String']>;
  description_tsv?: InputMaybe<Scalars['tsvector']>;
  fdc_id?: InputMaybe<Scalars['Int']>;
  food_attributes?: InputMaybe<Food_Attribute_Arr_Rel_Insert_Input>;
  food_category?: InputMaybe<Food_Category_Obj_Rel_Insert_Input>;
  food_category_id?: InputMaybe<Scalars['Int']>;
  food_nutrients?: InputMaybe<Food_Nutrient_Arr_Rel_Insert_Input>;
  food_portions?: InputMaybe<Food_Portion_Arr_Rel_Insert_Input>;
  publication_date?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Food_Max_Fields = {
  __typename?: 'food_max_fields';
  description?: Maybe<Scalars['String']>;
  fdc_id?: Maybe<Scalars['Int']>;
  food_category_id?: Maybe<Scalars['Int']>;
  publication_date?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "food" */
export type Food_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  food_category_id?: InputMaybe<Order_By>;
  publication_date?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Food_Min_Fields = {
  __typename?: 'food_min_fields';
  description?: Maybe<Scalars['String']>;
  fdc_id?: Maybe<Scalars['Int']>;
  food_category_id?: Maybe<Scalars['Int']>;
  publication_date?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "food" */
export type Food_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  food_category_id?: InputMaybe<Order_By>;
  publication_date?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "food" */
export type Food_Mutation_Response = {
  __typename?: 'food_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Food>;
};

/** columns and relationships of "food_nutrient" */
export type Food_Nutrient = {
  __typename?: 'food_nutrient';
  amount?: Maybe<Scalars['float8']>;
  data_points?: Maybe<Scalars['Int']>;
  derivation_id?: Maybe<Scalars['Int']>;
  fdc_id?: Maybe<Scalars['Int']>;
  footnote?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  max?: Maybe<Scalars['float8']>;
  median?: Maybe<Scalars['float8']>;
  min?: Maybe<Scalars['float8']>;
  min_year_acquired?: Maybe<Scalars['Int']>;
  /** An object relationship */
  nutrient?: Maybe<Nutrient>;
  nutrient_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "food_nutrient" */
export type Food_Nutrient_Aggregate = {
  __typename?: 'food_nutrient_aggregate';
  aggregate?: Maybe<Food_Nutrient_Aggregate_Fields>;
  nodes: Array<Food_Nutrient>;
};

/** aggregate fields of "food_nutrient" */
export type Food_Nutrient_Aggregate_Fields = {
  __typename?: 'food_nutrient_aggregate_fields';
  avg?: Maybe<Food_Nutrient_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Food_Nutrient_Max_Fields>;
  min?: Maybe<Food_Nutrient_Min_Fields>;
  stddev?: Maybe<Food_Nutrient_Stddev_Fields>;
  stddev_pop?: Maybe<Food_Nutrient_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Food_Nutrient_Stddev_Samp_Fields>;
  sum?: Maybe<Food_Nutrient_Sum_Fields>;
  var_pop?: Maybe<Food_Nutrient_Var_Pop_Fields>;
  var_samp?: Maybe<Food_Nutrient_Var_Samp_Fields>;
  variance?: Maybe<Food_Nutrient_Variance_Fields>;
};


/** aggregate fields of "food_nutrient" */
export type Food_Nutrient_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Food_Nutrient_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "food_nutrient" */
export type Food_Nutrient_Aggregate_Order_By = {
  avg?: InputMaybe<Food_Nutrient_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Food_Nutrient_Max_Order_By>;
  min?: InputMaybe<Food_Nutrient_Min_Order_By>;
  stddev?: InputMaybe<Food_Nutrient_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Food_Nutrient_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Food_Nutrient_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Food_Nutrient_Sum_Order_By>;
  var_pop?: InputMaybe<Food_Nutrient_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Food_Nutrient_Var_Samp_Order_By>;
  variance?: InputMaybe<Food_Nutrient_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "food_nutrient" */
export type Food_Nutrient_Arr_Rel_Insert_Input = {
  data: Array<Food_Nutrient_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Food_Nutrient_On_Conflict>;
};

/** aggregate avg on columns */
export type Food_Nutrient_Avg_Fields = {
  __typename?: 'food_nutrient_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  derivation_id?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  median?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  nutrient_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "food_nutrient" */
export type Food_Nutrient_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "food_nutrient". All fields are combined with a logical 'AND'. */
export type Food_Nutrient_Bool_Exp = {
  _and?: InputMaybe<Array<Food_Nutrient_Bool_Exp>>;
  _not?: InputMaybe<Food_Nutrient_Bool_Exp>;
  _or?: InputMaybe<Array<Food_Nutrient_Bool_Exp>>;
  amount?: InputMaybe<Float8_Comparison_Exp>;
  data_points?: InputMaybe<Int_Comparison_Exp>;
  derivation_id?: InputMaybe<Int_Comparison_Exp>;
  fdc_id?: InputMaybe<Int_Comparison_Exp>;
  footnote?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  max?: InputMaybe<Float8_Comparison_Exp>;
  median?: InputMaybe<Float8_Comparison_Exp>;
  min?: InputMaybe<Float8_Comparison_Exp>;
  min_year_acquired?: InputMaybe<Int_Comparison_Exp>;
  nutrient?: InputMaybe<Nutrient_Bool_Exp>;
  nutrient_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "food_nutrient" */
export enum Food_Nutrient_Constraint {
  /** unique or primary key constraint */
  FoodNutrientPkey = 'food_nutrient_pkey'
}

/** input type for incrementing numeric columns in table "food_nutrient" */
export type Food_Nutrient_Inc_Input = {
  amount?: InputMaybe<Scalars['float8']>;
  data_points?: InputMaybe<Scalars['Int']>;
  derivation_id?: InputMaybe<Scalars['Int']>;
  fdc_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  max?: InputMaybe<Scalars['float8']>;
  median?: InputMaybe<Scalars['float8']>;
  min?: InputMaybe<Scalars['float8']>;
  min_year_acquired?: InputMaybe<Scalars['Int']>;
  nutrient_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "food_nutrient" */
export type Food_Nutrient_Insert_Input = {
  amount?: InputMaybe<Scalars['float8']>;
  data_points?: InputMaybe<Scalars['Int']>;
  derivation_id?: InputMaybe<Scalars['Int']>;
  fdc_id?: InputMaybe<Scalars['Int']>;
  footnote?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  max?: InputMaybe<Scalars['float8']>;
  median?: InputMaybe<Scalars['float8']>;
  min?: InputMaybe<Scalars['float8']>;
  min_year_acquired?: InputMaybe<Scalars['Int']>;
  nutrient?: InputMaybe<Nutrient_Obj_Rel_Insert_Input>;
  nutrient_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Food_Nutrient_Max_Fields = {
  __typename?: 'food_nutrient_max_fields';
  amount?: Maybe<Scalars['float8']>;
  data_points?: Maybe<Scalars['Int']>;
  derivation_id?: Maybe<Scalars['Int']>;
  fdc_id?: Maybe<Scalars['Int']>;
  footnote?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['float8']>;
  median?: Maybe<Scalars['float8']>;
  min?: Maybe<Scalars['float8']>;
  min_year_acquired?: Maybe<Scalars['Int']>;
  nutrient_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "food_nutrient" */
export type Food_Nutrient_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  footnote?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Food_Nutrient_Min_Fields = {
  __typename?: 'food_nutrient_min_fields';
  amount?: Maybe<Scalars['float8']>;
  data_points?: Maybe<Scalars['Int']>;
  derivation_id?: Maybe<Scalars['Int']>;
  fdc_id?: Maybe<Scalars['Int']>;
  footnote?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['float8']>;
  median?: Maybe<Scalars['float8']>;
  min?: Maybe<Scalars['float8']>;
  min_year_acquired?: Maybe<Scalars['Int']>;
  nutrient_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "food_nutrient" */
export type Food_Nutrient_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  footnote?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "food_nutrient" */
export type Food_Nutrient_Mutation_Response = {
  __typename?: 'food_nutrient_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Food_Nutrient>;
};

/** on conflict condition type for table "food_nutrient" */
export type Food_Nutrient_On_Conflict = {
  constraint: Food_Nutrient_Constraint;
  update_columns?: Array<Food_Nutrient_Update_Column>;
  where?: InputMaybe<Food_Nutrient_Bool_Exp>;
};

/** Ordering options when selecting data from "food_nutrient". */
export type Food_Nutrient_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  footnote?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient?: InputMaybe<Nutrient_Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: food_nutrient */
export type Food_Nutrient_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "food_nutrient" */
export enum Food_Nutrient_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  DataPoints = 'data_points',
  /** column name */
  DerivationId = 'derivation_id',
  /** column name */
  FdcId = 'fdc_id',
  /** column name */
  Footnote = 'footnote',
  /** column name */
  Id = 'id',
  /** column name */
  Max = 'max',
  /** column name */
  Median = 'median',
  /** column name */
  Min = 'min',
  /** column name */
  MinYearAcquired = 'min_year_acquired',
  /** column name */
  NutrientId = 'nutrient_id'
}

/** input type for updating data in table "food_nutrient" */
export type Food_Nutrient_Set_Input = {
  amount?: InputMaybe<Scalars['float8']>;
  data_points?: InputMaybe<Scalars['Int']>;
  derivation_id?: InputMaybe<Scalars['Int']>;
  fdc_id?: InputMaybe<Scalars['Int']>;
  footnote?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  max?: InputMaybe<Scalars['float8']>;
  median?: InputMaybe<Scalars['float8']>;
  min?: InputMaybe<Scalars['float8']>;
  min_year_acquired?: InputMaybe<Scalars['Int']>;
  nutrient_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Food_Nutrient_Stddev_Fields = {
  __typename?: 'food_nutrient_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  derivation_id?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  median?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  nutrient_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "food_nutrient" */
export type Food_Nutrient_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Food_Nutrient_Stddev_Pop_Fields = {
  __typename?: 'food_nutrient_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  derivation_id?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  median?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  nutrient_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "food_nutrient" */
export type Food_Nutrient_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Food_Nutrient_Stddev_Samp_Fields = {
  __typename?: 'food_nutrient_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  derivation_id?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  median?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  nutrient_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "food_nutrient" */
export type Food_Nutrient_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Food_Nutrient_Sum_Fields = {
  __typename?: 'food_nutrient_sum_fields';
  amount?: Maybe<Scalars['float8']>;
  data_points?: Maybe<Scalars['Int']>;
  derivation_id?: Maybe<Scalars['Int']>;
  fdc_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['float8']>;
  median?: Maybe<Scalars['float8']>;
  min?: Maybe<Scalars['float8']>;
  min_year_acquired?: Maybe<Scalars['Int']>;
  nutrient_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "food_nutrient" */
export type Food_Nutrient_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** update columns of table "food_nutrient" */
export enum Food_Nutrient_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  DataPoints = 'data_points',
  /** column name */
  DerivationId = 'derivation_id',
  /** column name */
  FdcId = 'fdc_id',
  /** column name */
  Footnote = 'footnote',
  /** column name */
  Id = 'id',
  /** column name */
  Max = 'max',
  /** column name */
  Median = 'median',
  /** column name */
  Min = 'min',
  /** column name */
  MinYearAcquired = 'min_year_acquired',
  /** column name */
  NutrientId = 'nutrient_id'
}

/** aggregate var_pop on columns */
export type Food_Nutrient_Var_Pop_Fields = {
  __typename?: 'food_nutrient_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  derivation_id?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  median?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  nutrient_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "food_nutrient" */
export type Food_Nutrient_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Food_Nutrient_Var_Samp_Fields = {
  __typename?: 'food_nutrient_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  derivation_id?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  median?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  nutrient_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "food_nutrient" */
export type Food_Nutrient_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Food_Nutrient_Variance_Fields = {
  __typename?: 'food_nutrient_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  derivation_id?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  median?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  nutrient_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "food_nutrient" */
export type Food_Nutrient_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  derivation_id?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_By>;
  median?: InputMaybe<Order_By>;
  min?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  nutrient_id?: InputMaybe<Order_By>;
};

/** input type for inserting object relation for remote table "food" */
export type Food_Obj_Rel_Insert_Input = {
  data: Food_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Food_On_Conflict>;
};

/** on conflict condition type for table "food" */
export type Food_On_Conflict = {
  constraint: Food_Constraint;
  update_columns?: Array<Food_Update_Column>;
  where?: InputMaybe<Food_Bool_Exp>;
};

/** Ordering options when selecting data from "food". */
export type Food_Order_By = {
  data_type?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  description_tsv?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  food_attributes_aggregate?: InputMaybe<Food_Attribute_Aggregate_Order_By>;
  food_category?: InputMaybe<Food_Category_Order_By>;
  food_category_id?: InputMaybe<Order_By>;
  food_nutrients_aggregate?: InputMaybe<Food_Nutrient_Aggregate_Order_By>;
  food_portions_aggregate?: InputMaybe<Food_Portion_Aggregate_Order_By>;
  publication_date?: InputMaybe<Order_By>;
};

/** primary key columns input for table: food */
export type Food_Pk_Columns_Input = {
  fdc_id: Scalars['Int'];
};

/** columns and relationships of "food_portion" */
export type Food_Portion = {
  __typename?: 'food_portion';
  amount?: Maybe<Scalars['float8']>;
  data_points?: Maybe<Scalars['Int']>;
  fdc_id?: Maybe<Scalars['Int']>;
  footnote?: Maybe<Scalars['String']>;
  gram_weight?: Maybe<Scalars['float8']>;
  id: Scalars['Int'];
  /** An object relationship */
  measure_unit?: Maybe<Measure_Unit>;
  measure_unit_id?: Maybe<Scalars['Int']>;
  min_year_acquired?: Maybe<Scalars['Int']>;
  modifier?: Maybe<Scalars['String']>;
  portion_description?: Maybe<Scalars['String']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "food_portion" */
export type Food_Portion_Aggregate = {
  __typename?: 'food_portion_aggregate';
  aggregate?: Maybe<Food_Portion_Aggregate_Fields>;
  nodes: Array<Food_Portion>;
};

/** aggregate fields of "food_portion" */
export type Food_Portion_Aggregate_Fields = {
  __typename?: 'food_portion_aggregate_fields';
  avg?: Maybe<Food_Portion_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Food_Portion_Max_Fields>;
  min?: Maybe<Food_Portion_Min_Fields>;
  stddev?: Maybe<Food_Portion_Stddev_Fields>;
  stddev_pop?: Maybe<Food_Portion_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Food_Portion_Stddev_Samp_Fields>;
  sum?: Maybe<Food_Portion_Sum_Fields>;
  var_pop?: Maybe<Food_Portion_Var_Pop_Fields>;
  var_samp?: Maybe<Food_Portion_Var_Samp_Fields>;
  variance?: Maybe<Food_Portion_Variance_Fields>;
};


/** aggregate fields of "food_portion" */
export type Food_Portion_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Food_Portion_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "food_portion" */
export type Food_Portion_Aggregate_Order_By = {
  avg?: InputMaybe<Food_Portion_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Food_Portion_Max_Order_By>;
  min?: InputMaybe<Food_Portion_Min_Order_By>;
  stddev?: InputMaybe<Food_Portion_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Food_Portion_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Food_Portion_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Food_Portion_Sum_Order_By>;
  var_pop?: InputMaybe<Food_Portion_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Food_Portion_Var_Samp_Order_By>;
  variance?: InputMaybe<Food_Portion_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "food_portion" */
export type Food_Portion_Arr_Rel_Insert_Input = {
  data: Array<Food_Portion_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Food_Portion_On_Conflict>;
};

/** aggregate avg on columns */
export type Food_Portion_Avg_Fields = {
  __typename?: 'food_portion_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  gram_weight?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measure_unit_id?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "food_portion" */
export type Food_Portion_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "food_portion". All fields are combined with a logical 'AND'. */
export type Food_Portion_Bool_Exp = {
  _and?: InputMaybe<Array<Food_Portion_Bool_Exp>>;
  _not?: InputMaybe<Food_Portion_Bool_Exp>;
  _or?: InputMaybe<Array<Food_Portion_Bool_Exp>>;
  amount?: InputMaybe<Float8_Comparison_Exp>;
  data_points?: InputMaybe<Int_Comparison_Exp>;
  fdc_id?: InputMaybe<Int_Comparison_Exp>;
  footnote?: InputMaybe<String_Comparison_Exp>;
  gram_weight?: InputMaybe<Float8_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  measure_unit?: InputMaybe<Measure_Unit_Bool_Exp>;
  measure_unit_id?: InputMaybe<Int_Comparison_Exp>;
  min_year_acquired?: InputMaybe<Int_Comparison_Exp>;
  modifier?: InputMaybe<String_Comparison_Exp>;
  portion_description?: InputMaybe<String_Comparison_Exp>;
  seq_num?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "food_portion" */
export enum Food_Portion_Constraint {
  /** unique or primary key constraint */
  FoodPortionPkey = 'food_portion_pkey'
}

/** input type for incrementing numeric columns in table "food_portion" */
export type Food_Portion_Inc_Input = {
  amount?: InputMaybe<Scalars['float8']>;
  data_points?: InputMaybe<Scalars['Int']>;
  fdc_id?: InputMaybe<Scalars['Int']>;
  gram_weight?: InputMaybe<Scalars['float8']>;
  id?: InputMaybe<Scalars['Int']>;
  measure_unit_id?: InputMaybe<Scalars['Int']>;
  min_year_acquired?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "food_portion" */
export type Food_Portion_Insert_Input = {
  amount?: InputMaybe<Scalars['float8']>;
  data_points?: InputMaybe<Scalars['Int']>;
  fdc_id?: InputMaybe<Scalars['Int']>;
  footnote?: InputMaybe<Scalars['String']>;
  gram_weight?: InputMaybe<Scalars['float8']>;
  id?: InputMaybe<Scalars['Int']>;
  measure_unit?: InputMaybe<Measure_Unit_Obj_Rel_Insert_Input>;
  measure_unit_id?: InputMaybe<Scalars['Int']>;
  min_year_acquired?: InputMaybe<Scalars['Int']>;
  modifier?: InputMaybe<Scalars['String']>;
  portion_description?: InputMaybe<Scalars['String']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Food_Portion_Max_Fields = {
  __typename?: 'food_portion_max_fields';
  amount?: Maybe<Scalars['float8']>;
  data_points?: Maybe<Scalars['Int']>;
  fdc_id?: Maybe<Scalars['Int']>;
  footnote?: Maybe<Scalars['String']>;
  gram_weight?: Maybe<Scalars['float8']>;
  id?: Maybe<Scalars['Int']>;
  measure_unit_id?: Maybe<Scalars['Int']>;
  min_year_acquired?: Maybe<Scalars['Int']>;
  modifier?: Maybe<Scalars['String']>;
  portion_description?: Maybe<Scalars['String']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "food_portion" */
export type Food_Portion_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  footnote?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  modifier?: InputMaybe<Order_By>;
  portion_description?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Food_Portion_Min_Fields = {
  __typename?: 'food_portion_min_fields';
  amount?: Maybe<Scalars['float8']>;
  data_points?: Maybe<Scalars['Int']>;
  fdc_id?: Maybe<Scalars['Int']>;
  footnote?: Maybe<Scalars['String']>;
  gram_weight?: Maybe<Scalars['float8']>;
  id?: Maybe<Scalars['Int']>;
  measure_unit_id?: Maybe<Scalars['Int']>;
  min_year_acquired?: Maybe<Scalars['Int']>;
  modifier?: Maybe<Scalars['String']>;
  portion_description?: Maybe<Scalars['String']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "food_portion" */
export type Food_Portion_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  footnote?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  modifier?: InputMaybe<Order_By>;
  portion_description?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "food_portion" */
export type Food_Portion_Mutation_Response = {
  __typename?: 'food_portion_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Food_Portion>;
};

/** input type for inserting object relation for remote table "food_portion" */
export type Food_Portion_Obj_Rel_Insert_Input = {
  data: Food_Portion_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Food_Portion_On_Conflict>;
};

/** on conflict condition type for table "food_portion" */
export type Food_Portion_On_Conflict = {
  constraint: Food_Portion_Constraint;
  update_columns?: Array<Food_Portion_Update_Column>;
  where?: InputMaybe<Food_Portion_Bool_Exp>;
};

/** Ordering options when selecting data from "food_portion". */
export type Food_Portion_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  footnote?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit?: InputMaybe<Measure_Unit_Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  modifier?: InputMaybe<Order_By>;
  portion_description?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** primary key columns input for table: food_portion */
export type Food_Portion_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "food_portion" */
export enum Food_Portion_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  DataPoints = 'data_points',
  /** column name */
  FdcId = 'fdc_id',
  /** column name */
  Footnote = 'footnote',
  /** column name */
  GramWeight = 'gram_weight',
  /** column name */
  Id = 'id',
  /** column name */
  MeasureUnitId = 'measure_unit_id',
  /** column name */
  MinYearAcquired = 'min_year_acquired',
  /** column name */
  Modifier = 'modifier',
  /** column name */
  PortionDescription = 'portion_description',
  /** column name */
  SeqNum = 'seq_num'
}

/** input type for updating data in table "food_portion" */
export type Food_Portion_Set_Input = {
  amount?: InputMaybe<Scalars['float8']>;
  data_points?: InputMaybe<Scalars['Int']>;
  fdc_id?: InputMaybe<Scalars['Int']>;
  footnote?: InputMaybe<Scalars['String']>;
  gram_weight?: InputMaybe<Scalars['float8']>;
  id?: InputMaybe<Scalars['Int']>;
  measure_unit_id?: InputMaybe<Scalars['Int']>;
  min_year_acquired?: InputMaybe<Scalars['Int']>;
  modifier?: InputMaybe<Scalars['String']>;
  portion_description?: InputMaybe<Scalars['String']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Food_Portion_Stddev_Fields = {
  __typename?: 'food_portion_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  gram_weight?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measure_unit_id?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "food_portion" */
export type Food_Portion_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Food_Portion_Stddev_Pop_Fields = {
  __typename?: 'food_portion_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  gram_weight?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measure_unit_id?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "food_portion" */
export type Food_Portion_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Food_Portion_Stddev_Samp_Fields = {
  __typename?: 'food_portion_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  gram_weight?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measure_unit_id?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "food_portion" */
export type Food_Portion_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Food_Portion_Sum_Fields = {
  __typename?: 'food_portion_sum_fields';
  amount?: Maybe<Scalars['float8']>;
  data_points?: Maybe<Scalars['Int']>;
  fdc_id?: Maybe<Scalars['Int']>;
  gram_weight?: Maybe<Scalars['float8']>;
  id?: Maybe<Scalars['Int']>;
  measure_unit_id?: Maybe<Scalars['Int']>;
  min_year_acquired?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "food_portion" */
export type Food_Portion_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** update columns of table "food_portion" */
export enum Food_Portion_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  DataPoints = 'data_points',
  /** column name */
  FdcId = 'fdc_id',
  /** column name */
  Footnote = 'footnote',
  /** column name */
  GramWeight = 'gram_weight',
  /** column name */
  Id = 'id',
  /** column name */
  MeasureUnitId = 'measure_unit_id',
  /** column name */
  MinYearAcquired = 'min_year_acquired',
  /** column name */
  Modifier = 'modifier',
  /** column name */
  PortionDescription = 'portion_description',
  /** column name */
  SeqNum = 'seq_num'
}

/** aggregate var_pop on columns */
export type Food_Portion_Var_Pop_Fields = {
  __typename?: 'food_portion_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  gram_weight?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measure_unit_id?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "food_portion" */
export type Food_Portion_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Food_Portion_Var_Samp_Fields = {
  __typename?: 'food_portion_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  gram_weight?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measure_unit_id?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "food_portion" */
export type Food_Portion_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Food_Portion_Variance_Fields = {
  __typename?: 'food_portion_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  data_points?: Maybe<Scalars['Float']>;
  fdc_id?: Maybe<Scalars['Float']>;
  gram_weight?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measure_unit_id?: Maybe<Scalars['Float']>;
  min_year_acquired?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "food_portion" */
export type Food_Portion_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  data_points?: InputMaybe<Order_By>;
  fdc_id?: InputMaybe<Order_By>;
  gram_weight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  measure_unit_id?: InputMaybe<Order_By>;
  min_year_acquired?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** select columns of table "food" */
export enum Food_Select_Column {
  /** column name */
  DataType = 'data_type',
  /** column name */
  Description = 'description',
  /** column name */
  DescriptionTsv = 'description_tsv',
  /** column name */
  FdcId = 'fdc_id',
  /** column name */
  FoodCategoryId = 'food_category_id',
  /** column name */
  PublicationDate = 'publication_date'
}

/** input type for updating data in table "food" */
export type Food_Set_Input = {
  data_type?: InputMaybe<Scalars['food_data_type_enum']>;
  description?: InputMaybe<Scalars['String']>;
  description_tsv?: InputMaybe<Scalars['tsvector']>;
  fdc_id?: InputMaybe<Scalars['Int']>;
  food_category_id?: InputMaybe<Scalars['Int']>;
  publication_date?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type Food_Stddev_Fields = {
  __typename?: 'food_stddev_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_category_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "food" */
export type Food_Stddev_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_category_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Food_Stddev_Pop_Fields = {
  __typename?: 'food_stddev_pop_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_category_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "food" */
export type Food_Stddev_Pop_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_category_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Food_Stddev_Samp_Fields = {
  __typename?: 'food_stddev_samp_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_category_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "food" */
export type Food_Stddev_Samp_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_category_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Food_Sum_Fields = {
  __typename?: 'food_sum_fields';
  fdc_id?: Maybe<Scalars['Int']>;
  food_category_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "food" */
export type Food_Sum_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_category_id?: InputMaybe<Order_By>;
};

/** update columns of table "food" */
export enum Food_Update_Column {
  /** column name */
  DataType = 'data_type',
  /** column name */
  Description = 'description',
  /** column name */
  DescriptionTsv = 'description_tsv',
  /** column name */
  FdcId = 'fdc_id',
  /** column name */
  FoodCategoryId = 'food_category_id',
  /** column name */
  PublicationDate = 'publication_date'
}

/** aggregate var_pop on columns */
export type Food_Var_Pop_Fields = {
  __typename?: 'food_var_pop_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_category_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "food" */
export type Food_Var_Pop_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_category_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Food_Var_Samp_Fields = {
  __typename?: 'food_var_samp_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_category_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "food" */
export type Food_Var_Samp_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_category_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Food_Variance_Fields = {
  __typename?: 'food_variance_fields';
  fdc_id?: Maybe<Scalars['Float']>;
  food_category_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "food" */
export type Food_Variance_Order_By = {
  fdc_id?: InputMaybe<Order_By>;
  food_category_id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "measure_unit" */
export type Measure_Unit = {
  __typename?: 'measure_unit';
  id: Scalars['Int'];
  ml?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregated selection of "measure_unit" */
export type Measure_Unit_Aggregate = {
  __typename?: 'measure_unit_aggregate';
  aggregate?: Maybe<Measure_Unit_Aggregate_Fields>;
  nodes: Array<Measure_Unit>;
};

/** aggregate fields of "measure_unit" */
export type Measure_Unit_Aggregate_Fields = {
  __typename?: 'measure_unit_aggregate_fields';
  avg?: Maybe<Measure_Unit_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Measure_Unit_Max_Fields>;
  min?: Maybe<Measure_Unit_Min_Fields>;
  stddev?: Maybe<Measure_Unit_Stddev_Fields>;
  stddev_pop?: Maybe<Measure_Unit_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Measure_Unit_Stddev_Samp_Fields>;
  sum?: Maybe<Measure_Unit_Sum_Fields>;
  var_pop?: Maybe<Measure_Unit_Var_Pop_Fields>;
  var_samp?: Maybe<Measure_Unit_Var_Samp_Fields>;
  variance?: Maybe<Measure_Unit_Variance_Fields>;
};


/** aggregate fields of "measure_unit" */
export type Measure_Unit_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Measure_Unit_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Measure_Unit_Avg_Fields = {
  __typename?: 'measure_unit_avg_fields';
  id?: Maybe<Scalars['Float']>;
  ml?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "measure_unit". All fields are combined with a logical 'AND'. */
export type Measure_Unit_Bool_Exp = {
  _and?: InputMaybe<Array<Measure_Unit_Bool_Exp>>;
  _not?: InputMaybe<Measure_Unit_Bool_Exp>;
  _or?: InputMaybe<Array<Measure_Unit_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  ml?: InputMaybe<Float8_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "measure_unit" */
export enum Measure_Unit_Constraint {
  /** unique or primary key constraint */
  MeasureUnitPkey = 'measure_unit_pkey'
}

/** input type for incrementing numeric columns in table "measure_unit" */
export type Measure_Unit_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  ml?: InputMaybe<Scalars['float8']>;
};

/** input type for inserting data into table "measure_unit" */
export type Measure_Unit_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  ml?: InputMaybe<Scalars['float8']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Measure_Unit_Max_Fields = {
  __typename?: 'measure_unit_max_fields';
  id?: Maybe<Scalars['Int']>;
  ml?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Measure_Unit_Min_Fields = {
  __typename?: 'measure_unit_min_fields';
  id?: Maybe<Scalars['Int']>;
  ml?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "measure_unit" */
export type Measure_Unit_Mutation_Response = {
  __typename?: 'measure_unit_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Measure_Unit>;
};

/** input type for inserting object relation for remote table "measure_unit" */
export type Measure_Unit_Obj_Rel_Insert_Input = {
  data: Measure_Unit_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Measure_Unit_On_Conflict>;
};

/** on conflict condition type for table "measure_unit" */
export type Measure_Unit_On_Conflict = {
  constraint: Measure_Unit_Constraint;
  update_columns?: Array<Measure_Unit_Update_Column>;
  where?: InputMaybe<Measure_Unit_Bool_Exp>;
};

/** Ordering options when selecting data from "measure_unit". */
export type Measure_Unit_Order_By = {
  id?: InputMaybe<Order_By>;
  ml?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: measure_unit */
export type Measure_Unit_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "measure_unit" */
export enum Measure_Unit_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Ml = 'ml',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "measure_unit" */
export type Measure_Unit_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  ml?: InputMaybe<Scalars['float8']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Measure_Unit_Stddev_Fields = {
  __typename?: 'measure_unit_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  ml?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Measure_Unit_Stddev_Pop_Fields = {
  __typename?: 'measure_unit_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  ml?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Measure_Unit_Stddev_Samp_Fields = {
  __typename?: 'measure_unit_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  ml?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Measure_Unit_Sum_Fields = {
  __typename?: 'measure_unit_sum_fields';
  id?: Maybe<Scalars['Int']>;
  ml?: Maybe<Scalars['float8']>;
};

/** update columns of table "measure_unit" */
export enum Measure_Unit_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Ml = 'ml',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Measure_Unit_Var_Pop_Fields = {
  __typename?: 'measure_unit_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  ml?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Measure_Unit_Var_Samp_Fields = {
  __typename?: 'measure_unit_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  ml?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Measure_Unit_Variance_Fields = {
  __typename?: 'measure_unit_variance_fields';
  id?: Maybe<Scalars['Float']>;
  ml?: Maybe<Scalars['Float']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete single row from the table: "auth.providers" */
  deleteAuthProvider?: Maybe<AuthProviders>;
  /** delete single row from the table: "auth.provider_requests" */
  deleteAuthProviderRequest?: Maybe<AuthProviderRequests>;
  /** delete data from the table: "auth.provider_requests" */
  deleteAuthProviderRequests?: Maybe<AuthProviderRequests_Mutation_Response>;
  /** delete data from the table: "auth.providers" */
  deleteAuthProviders?: Maybe<AuthProviders_Mutation_Response>;
  /** delete single row from the table: "auth.refresh_tokens" */
  deleteAuthRefreshToken?: Maybe<AuthRefreshTokens>;
  /** delete data from the table: "auth.refresh_tokens" */
  deleteAuthRefreshTokens?: Maybe<AuthRefreshTokens_Mutation_Response>;
  /** delete single row from the table: "auth.roles" */
  deleteAuthRole?: Maybe<AuthRoles>;
  /** delete data from the table: "auth.roles" */
  deleteAuthRoles?: Maybe<AuthRoles_Mutation_Response>;
  /** delete single row from the table: "auth.user_providers" */
  deleteAuthUserProvider?: Maybe<AuthUserProviders>;
  /** delete data from the table: "auth.user_providers" */
  deleteAuthUserProviders?: Maybe<AuthUserProviders_Mutation_Response>;
  /** delete single row from the table: "auth.user_roles" */
  deleteAuthUserRole?: Maybe<AuthUserRoles>;
  /** delete data from the table: "auth.user_roles" */
  deleteAuthUserRoles?: Maybe<AuthUserRoles_Mutation_Response>;
  /** delete single row from the table: "auth.users" */
  deleteUser?: Maybe<Users>;
  /** delete data from the table: "auth.users" */
  deleteUsers?: Maybe<Users_Mutation_Response>;
  /** delete data from the table: "food" */
  delete_food?: Maybe<Food_Mutation_Response>;
  /** delete data from the table: "food_attribute" */
  delete_food_attribute?: Maybe<Food_Attribute_Mutation_Response>;
  /** delete single row from the table: "food_attribute" */
  delete_food_attribute_by_pk?: Maybe<Food_Attribute>;
  /** delete data from the table: "food_attribute_type" */
  delete_food_attribute_type?: Maybe<Food_Attribute_Type_Mutation_Response>;
  /** delete single row from the table: "food_attribute_type" */
  delete_food_attribute_type_by_pk?: Maybe<Food_Attribute_Type>;
  /** delete single row from the table: "food" */
  delete_food_by_pk?: Maybe<Food>;
  /** delete data from the table: "food_category" */
  delete_food_category?: Maybe<Food_Category_Mutation_Response>;
  /** delete single row from the table: "food_category" */
  delete_food_category_by_pk?: Maybe<Food_Category>;
  /** delete data from the table: "food_nutrient" */
  delete_food_nutrient?: Maybe<Food_Nutrient_Mutation_Response>;
  /** delete single row from the table: "food_nutrient" */
  delete_food_nutrient_by_pk?: Maybe<Food_Nutrient>;
  /** delete data from the table: "food_portion" */
  delete_food_portion?: Maybe<Food_Portion_Mutation_Response>;
  /** delete single row from the table: "food_portion" */
  delete_food_portion_by_pk?: Maybe<Food_Portion>;
  /** delete data from the table: "measure_unit" */
  delete_measure_unit?: Maybe<Measure_Unit_Mutation_Response>;
  /** delete single row from the table: "measure_unit" */
  delete_measure_unit_by_pk?: Maybe<Measure_Unit>;
  /** delete data from the table: "nutrient" */
  delete_nutrient?: Maybe<Nutrient_Mutation_Response>;
  /** delete single row from the table: "nutrient" */
  delete_nutrient_by_pk?: Maybe<Nutrient>;
  /** delete data from the table: "recipe_direction_actions" */
  delete_recipe_direction_actions?: Maybe<Recipe_Direction_Actions_Mutation_Response>;
  /** delete single row from the table: "recipe_direction_actions" */
  delete_recipe_direction_actions_by_pk?: Maybe<Recipe_Direction_Actions>;
  /** delete data from the table: "recipe_direction_durations" */
  delete_recipe_direction_durations?: Maybe<Recipe_Direction_Durations_Mutation_Response>;
  /** delete single row from the table: "recipe_direction_durations" */
  delete_recipe_direction_durations_by_pk?: Maybe<Recipe_Direction_Durations>;
  /** delete data from the table: "recipe_directions" */
  delete_recipe_directions?: Maybe<Recipe_Directions_Mutation_Response>;
  /** delete single row from the table: "recipe_directions" */
  delete_recipe_directions_by_pk?: Maybe<Recipe_Directions>;
  /** delete data from the table: "recipe_favorite" */
  delete_recipe_favorite?: Maybe<Recipe_Favorite_Mutation_Response>;
  /** delete single row from the table: "recipe_favorite" */
  delete_recipe_favorite_by_pk?: Maybe<Recipe_Favorite>;
  /** delete data from the table: "recipe_ingredient_food_candidate" */
  delete_recipe_ingredient_food_candidate?: Maybe<Recipe_Ingredient_Food_Candidate_Mutation_Response>;
  /** delete single row from the table: "recipe_ingredient_food_candidate" */
  delete_recipe_ingredient_food_candidate_by_pk?: Maybe<Recipe_Ingredient_Food_Candidate>;
  /** delete data from the table: "recipe_ingredient_groups" */
  delete_recipe_ingredient_groups?: Maybe<Recipe_Ingredient_Groups_Mutation_Response>;
  /** delete single row from the table: "recipe_ingredient_groups" */
  delete_recipe_ingredient_groups_by_pk?: Maybe<Recipe_Ingredient_Groups>;
  /** delete data from the table: "recipe_ingredients" */
  delete_recipe_ingredients?: Maybe<Recipe_Ingredients_Mutation_Response>;
  /** delete single row from the table: "recipe_ingredients" */
  delete_recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** delete data from the table: "recipe_list_items" */
  delete_recipe_list_items?: Maybe<Recipe_List_Items_Mutation_Response>;
  /** delete single row from the table: "recipe_list_items" */
  delete_recipe_list_items_by_pk?: Maybe<Recipe_List_Items>;
  /** delete data from the table: "recipe_lists" */
  delete_recipe_lists?: Maybe<Recipe_Lists_Mutation_Response>;
  /** delete single row from the table: "recipe_lists" */
  delete_recipe_lists_by_pk?: Maybe<Recipe_Lists>;
  /** delete data from the table: "recipe_tags" */
  delete_recipe_tags?: Maybe<Recipe_Tags_Mutation_Response>;
  /** delete single row from the table: "recipe_tags" */
  delete_recipe_tags_by_pk?: Maybe<Recipe_Tags>;
  /** delete data from the table: "recipes" */
  delete_recipes?: Maybe<Recipes_Mutation_Response>;
  /** delete single row from the table: "recipes" */
  delete_recipes_by_pk?: Maybe<Recipes>;
  /** delete data from the table: "user_config" */
  delete_user_config?: Maybe<User_Config_Mutation_Response>;
  /** delete single row from the table: "user_config" */
  delete_user_config_by_pk?: Maybe<User_Config>;
  /** insert a single row into the table: "auth.providers" */
  insertAuthProvider?: Maybe<AuthProviders>;
  /** insert a single row into the table: "auth.provider_requests" */
  insertAuthProviderRequest?: Maybe<AuthProviderRequests>;
  /** insert data into the table: "auth.provider_requests" */
  insertAuthProviderRequests?: Maybe<AuthProviderRequests_Mutation_Response>;
  /** insert data into the table: "auth.providers" */
  insertAuthProviders?: Maybe<AuthProviders_Mutation_Response>;
  /** insert a single row into the table: "auth.refresh_tokens" */
  insertAuthRefreshToken?: Maybe<AuthRefreshTokens>;
  /** insert data into the table: "auth.refresh_tokens" */
  insertAuthRefreshTokens?: Maybe<AuthRefreshTokens_Mutation_Response>;
  /** insert a single row into the table: "auth.roles" */
  insertAuthRole?: Maybe<AuthRoles>;
  /** insert data into the table: "auth.roles" */
  insertAuthRoles?: Maybe<AuthRoles_Mutation_Response>;
  /** insert a single row into the table: "auth.user_providers" */
  insertAuthUserProvider?: Maybe<AuthUserProviders>;
  /** insert data into the table: "auth.user_providers" */
  insertAuthUserProviders?: Maybe<AuthUserProviders_Mutation_Response>;
  /** insert a single row into the table: "auth.user_roles" */
  insertAuthUserRole?: Maybe<AuthUserRoles>;
  /** insert data into the table: "auth.user_roles" */
  insertAuthUserRoles?: Maybe<AuthUserRoles_Mutation_Response>;
  /** insert a single row into the table: "auth.users" */
  insertUser?: Maybe<Users>;
  /** insert data into the table: "auth.users" */
  insertUsers?: Maybe<Users_Mutation_Response>;
  /** insert data into the table: "food" */
  insert_food?: Maybe<Food_Mutation_Response>;
  /** insert data into the table: "food_attribute" */
  insert_food_attribute?: Maybe<Food_Attribute_Mutation_Response>;
  /** insert a single row into the table: "food_attribute" */
  insert_food_attribute_one?: Maybe<Food_Attribute>;
  /** insert data into the table: "food_attribute_type" */
  insert_food_attribute_type?: Maybe<Food_Attribute_Type_Mutation_Response>;
  /** insert a single row into the table: "food_attribute_type" */
  insert_food_attribute_type_one?: Maybe<Food_Attribute_Type>;
  /** insert data into the table: "food_category" */
  insert_food_category?: Maybe<Food_Category_Mutation_Response>;
  /** insert a single row into the table: "food_category" */
  insert_food_category_one?: Maybe<Food_Category>;
  /** insert data into the table: "food_nutrient" */
  insert_food_nutrient?: Maybe<Food_Nutrient_Mutation_Response>;
  /** insert a single row into the table: "food_nutrient" */
  insert_food_nutrient_one?: Maybe<Food_Nutrient>;
  /** insert a single row into the table: "food" */
  insert_food_one?: Maybe<Food>;
  /** insert data into the table: "food_portion" */
  insert_food_portion?: Maybe<Food_Portion_Mutation_Response>;
  /** insert a single row into the table: "food_portion" */
  insert_food_portion_one?: Maybe<Food_Portion>;
  /** insert data into the table: "measure_unit" */
  insert_measure_unit?: Maybe<Measure_Unit_Mutation_Response>;
  /** insert a single row into the table: "measure_unit" */
  insert_measure_unit_one?: Maybe<Measure_Unit>;
  /** insert data into the table: "nutrient" */
  insert_nutrient?: Maybe<Nutrient_Mutation_Response>;
  /** insert a single row into the table: "nutrient" */
  insert_nutrient_one?: Maybe<Nutrient>;
  /** insert data into the table: "recipe_direction_actions" */
  insert_recipe_direction_actions?: Maybe<Recipe_Direction_Actions_Mutation_Response>;
  /** insert a single row into the table: "recipe_direction_actions" */
  insert_recipe_direction_actions_one?: Maybe<Recipe_Direction_Actions>;
  /** insert data into the table: "recipe_direction_durations" */
  insert_recipe_direction_durations?: Maybe<Recipe_Direction_Durations_Mutation_Response>;
  /** insert a single row into the table: "recipe_direction_durations" */
  insert_recipe_direction_durations_one?: Maybe<Recipe_Direction_Durations>;
  /** insert data into the table: "recipe_directions" */
  insert_recipe_directions?: Maybe<Recipe_Directions_Mutation_Response>;
  /** insert a single row into the table: "recipe_directions" */
  insert_recipe_directions_one?: Maybe<Recipe_Directions>;
  /** insert data into the table: "recipe_favorite" */
  insert_recipe_favorite?: Maybe<Recipe_Favorite_Mutation_Response>;
  /** insert a single row into the table: "recipe_favorite" */
  insert_recipe_favorite_one?: Maybe<Recipe_Favorite>;
  /** insert data into the table: "recipe_ingredient_food_candidate" */
  insert_recipe_ingredient_food_candidate?: Maybe<Recipe_Ingredient_Food_Candidate_Mutation_Response>;
  /** insert a single row into the table: "recipe_ingredient_food_candidate" */
  insert_recipe_ingredient_food_candidate_one?: Maybe<Recipe_Ingredient_Food_Candidate>;
  /** insert data into the table: "recipe_ingredient_groups" */
  insert_recipe_ingredient_groups?: Maybe<Recipe_Ingredient_Groups_Mutation_Response>;
  /** insert a single row into the table: "recipe_ingredient_groups" */
  insert_recipe_ingredient_groups_one?: Maybe<Recipe_Ingredient_Groups>;
  /** insert data into the table: "recipe_ingredients" */
  insert_recipe_ingredients?: Maybe<Recipe_Ingredients_Mutation_Response>;
  /** insert a single row into the table: "recipe_ingredients" */
  insert_recipe_ingredients_one?: Maybe<Recipe_Ingredients>;
  /** insert data into the table: "recipe_list_items" */
  insert_recipe_list_items?: Maybe<Recipe_List_Items_Mutation_Response>;
  /** insert a single row into the table: "recipe_list_items" */
  insert_recipe_list_items_one?: Maybe<Recipe_List_Items>;
  /** insert data into the table: "recipe_lists" */
  insert_recipe_lists?: Maybe<Recipe_Lists_Mutation_Response>;
  /** insert a single row into the table: "recipe_lists" */
  insert_recipe_lists_one?: Maybe<Recipe_Lists>;
  /** insert data into the table: "recipe_tags" */
  insert_recipe_tags?: Maybe<Recipe_Tags_Mutation_Response>;
  /** insert a single row into the table: "recipe_tags" */
  insert_recipe_tags_one?: Maybe<Recipe_Tags>;
  /** insert data into the table: "recipes" */
  insert_recipes?: Maybe<Recipes_Mutation_Response>;
  /** insert a single row into the table: "recipes" */
  insert_recipes_one?: Maybe<Recipes>;
  /** insert data into the table: "user_config" */
  insert_user_config?: Maybe<User_Config_Mutation_Response>;
  /** insert a single row into the table: "user_config" */
  insert_user_config_one?: Maybe<User_Config>;
  /** update single row of the table: "auth.providers" */
  updateAuthProvider?: Maybe<AuthProviders>;
  /** update single row of the table: "auth.provider_requests" */
  updateAuthProviderRequest?: Maybe<AuthProviderRequests>;
  /** update data of the table: "auth.provider_requests" */
  updateAuthProviderRequests?: Maybe<AuthProviderRequests_Mutation_Response>;
  /** update data of the table: "auth.providers" */
  updateAuthProviders?: Maybe<AuthProviders_Mutation_Response>;
  /** update single row of the table: "auth.refresh_tokens" */
  updateAuthRefreshToken?: Maybe<AuthRefreshTokens>;
  /** update data of the table: "auth.refresh_tokens" */
  updateAuthRefreshTokens?: Maybe<AuthRefreshTokens_Mutation_Response>;
  /** update single row of the table: "auth.roles" */
  updateAuthRole?: Maybe<AuthRoles>;
  /** update data of the table: "auth.roles" */
  updateAuthRoles?: Maybe<AuthRoles_Mutation_Response>;
  /** update single row of the table: "auth.user_providers" */
  updateAuthUserProvider?: Maybe<AuthUserProviders>;
  /** update data of the table: "auth.user_providers" */
  updateAuthUserProviders?: Maybe<AuthUserProviders_Mutation_Response>;
  /** update single row of the table: "auth.user_roles" */
  updateAuthUserRole?: Maybe<AuthUserRoles>;
  /** update data of the table: "auth.user_roles" */
  updateAuthUserRoles?: Maybe<AuthUserRoles_Mutation_Response>;
  /** update single row of the table: "auth.users" */
  updateUser?: Maybe<Users>;
  /** update data of the table: "auth.users" */
  updateUsers?: Maybe<Users_Mutation_Response>;
  /** update data of the table: "food" */
  update_food?: Maybe<Food_Mutation_Response>;
  /** update data of the table: "food_attribute" */
  update_food_attribute?: Maybe<Food_Attribute_Mutation_Response>;
  /** update single row of the table: "food_attribute" */
  update_food_attribute_by_pk?: Maybe<Food_Attribute>;
  /** update data of the table: "food_attribute_type" */
  update_food_attribute_type?: Maybe<Food_Attribute_Type_Mutation_Response>;
  /** update single row of the table: "food_attribute_type" */
  update_food_attribute_type_by_pk?: Maybe<Food_Attribute_Type>;
  /** update single row of the table: "food" */
  update_food_by_pk?: Maybe<Food>;
  /** update data of the table: "food_category" */
  update_food_category?: Maybe<Food_Category_Mutation_Response>;
  /** update single row of the table: "food_category" */
  update_food_category_by_pk?: Maybe<Food_Category>;
  /** update data of the table: "food_nutrient" */
  update_food_nutrient?: Maybe<Food_Nutrient_Mutation_Response>;
  /** update single row of the table: "food_nutrient" */
  update_food_nutrient_by_pk?: Maybe<Food_Nutrient>;
  /** update data of the table: "food_portion" */
  update_food_portion?: Maybe<Food_Portion_Mutation_Response>;
  /** update single row of the table: "food_portion" */
  update_food_portion_by_pk?: Maybe<Food_Portion>;
  /** update data of the table: "measure_unit" */
  update_measure_unit?: Maybe<Measure_Unit_Mutation_Response>;
  /** update single row of the table: "measure_unit" */
  update_measure_unit_by_pk?: Maybe<Measure_Unit>;
  /** update data of the table: "nutrient" */
  update_nutrient?: Maybe<Nutrient_Mutation_Response>;
  /** update single row of the table: "nutrient" */
  update_nutrient_by_pk?: Maybe<Nutrient>;
  /** update data of the table: "recipe_direction_actions" */
  update_recipe_direction_actions?: Maybe<Recipe_Direction_Actions_Mutation_Response>;
  /** update single row of the table: "recipe_direction_actions" */
  update_recipe_direction_actions_by_pk?: Maybe<Recipe_Direction_Actions>;
  /** update data of the table: "recipe_direction_durations" */
  update_recipe_direction_durations?: Maybe<Recipe_Direction_Durations_Mutation_Response>;
  /** update single row of the table: "recipe_direction_durations" */
  update_recipe_direction_durations_by_pk?: Maybe<Recipe_Direction_Durations>;
  /** update data of the table: "recipe_directions" */
  update_recipe_directions?: Maybe<Recipe_Directions_Mutation_Response>;
  /** update single row of the table: "recipe_directions" */
  update_recipe_directions_by_pk?: Maybe<Recipe_Directions>;
  /** update data of the table: "recipe_favorite" */
  update_recipe_favorite?: Maybe<Recipe_Favorite_Mutation_Response>;
  /** update single row of the table: "recipe_favorite" */
  update_recipe_favorite_by_pk?: Maybe<Recipe_Favorite>;
  /** update data of the table: "recipe_ingredient_food_candidate" */
  update_recipe_ingredient_food_candidate?: Maybe<Recipe_Ingredient_Food_Candidate_Mutation_Response>;
  /** update single row of the table: "recipe_ingredient_food_candidate" */
  update_recipe_ingredient_food_candidate_by_pk?: Maybe<Recipe_Ingredient_Food_Candidate>;
  /** update data of the table: "recipe_ingredient_groups" */
  update_recipe_ingredient_groups?: Maybe<Recipe_Ingredient_Groups_Mutation_Response>;
  /** update single row of the table: "recipe_ingredient_groups" */
  update_recipe_ingredient_groups_by_pk?: Maybe<Recipe_Ingredient_Groups>;
  /** update data of the table: "recipe_ingredients" */
  update_recipe_ingredients?: Maybe<Recipe_Ingredients_Mutation_Response>;
  /** update single row of the table: "recipe_ingredients" */
  update_recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** update data of the table: "recipe_list_items" */
  update_recipe_list_items?: Maybe<Recipe_List_Items_Mutation_Response>;
  /** update single row of the table: "recipe_list_items" */
  update_recipe_list_items_by_pk?: Maybe<Recipe_List_Items>;
  /** update data of the table: "recipe_lists" */
  update_recipe_lists?: Maybe<Recipe_Lists_Mutation_Response>;
  /** update single row of the table: "recipe_lists" */
  update_recipe_lists_by_pk?: Maybe<Recipe_Lists>;
  /** update data of the table: "recipe_tags" */
  update_recipe_tags?: Maybe<Recipe_Tags_Mutation_Response>;
  /** update single row of the table: "recipe_tags" */
  update_recipe_tags_by_pk?: Maybe<Recipe_Tags>;
  /** update data of the table: "recipes" */
  update_recipes?: Maybe<Recipes_Mutation_Response>;
  /** update single row of the table: "recipes" */
  update_recipes_by_pk?: Maybe<Recipes>;
  /** update data of the table: "user_config" */
  update_user_config?: Maybe<User_Config_Mutation_Response>;
  /** update single row of the table: "user_config" */
  update_user_config_by_pk?: Maybe<User_Config>;
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderRequestArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderRequestsArgs = {
  where: AuthProviderRequests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthProvidersArgs = {
  where: AuthProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokenArgs = {
  refreshToken: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokensArgs = {
  where: AuthRefreshTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthRoleArgs = {
  role: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRolesArgs = {
  where: AuthRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserProviderArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserProvidersArgs = {
  where: AuthUserProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserRoleArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserRolesArgs = {
  where: AuthUserRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteUserArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_FoodArgs = {
  where: Food_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Food_AttributeArgs = {
  where: Food_Attribute_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Food_Attribute_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Food_Attribute_TypeArgs = {
  where: Food_Attribute_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Food_Attribute_Type_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Food_By_PkArgs = {
  fdc_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Food_CategoryArgs = {
  where: Food_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Food_Category_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Food_NutrientArgs = {
  where: Food_Nutrient_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Food_Nutrient_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Food_PortionArgs = {
  where: Food_Portion_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Food_Portion_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Measure_UnitArgs = {
  where: Measure_Unit_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Measure_Unit_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_NutrientArgs = {
  where: Nutrient_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Nutrient_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Direction_ActionsArgs = {
  where: Recipe_Direction_Actions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Direction_Actions_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Direction_DurationsArgs = {
  where: Recipe_Direction_Durations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Direction_Durations_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_DirectionsArgs = {
  where: Recipe_Directions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Directions_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_FavoriteArgs = {
  where: Recipe_Favorite_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Favorite_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Ingredient_Food_CandidateArgs = {
  where: Recipe_Ingredient_Food_Candidate_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Ingredient_Food_Candidate_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Ingredient_GroupsArgs = {
  where: Recipe_Ingredient_Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Ingredient_Groups_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_IngredientsArgs = {
  where: Recipe_Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Ingredients_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_List_ItemsArgs = {
  where: Recipe_List_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_List_Items_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_ListsArgs = {
  where: Recipe_Lists_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Lists_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_TagsArgs = {
  where: Recipe_Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Tags_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_RecipesArgs = {
  where: Recipes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipes_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_User_ConfigArgs = {
  where: User_Config_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Config_By_PkArgs = {
  user_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsertAuthProviderArgs = {
  object: AuthProviders_Insert_Input;
  on_conflict?: InputMaybe<AuthProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProviderRequestArgs = {
  object: AuthProviderRequests_Insert_Input;
  on_conflict?: InputMaybe<AuthProviderRequests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProviderRequestsArgs = {
  objects: Array<AuthProviderRequests_Insert_Input>;
  on_conflict?: InputMaybe<AuthProviderRequests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProvidersArgs = {
  objects: Array<AuthProviders_Insert_Input>;
  on_conflict?: InputMaybe<AuthProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokenArgs = {
  object: AuthRefreshTokens_Insert_Input;
  on_conflict?: InputMaybe<AuthRefreshTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokensArgs = {
  objects: Array<AuthRefreshTokens_Insert_Input>;
  on_conflict?: InputMaybe<AuthRefreshTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRoleArgs = {
  object: AuthRoles_Insert_Input;
  on_conflict?: InputMaybe<AuthRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRolesArgs = {
  objects: Array<AuthRoles_Insert_Input>;
  on_conflict?: InputMaybe<AuthRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserProviderArgs = {
  object: AuthUserProviders_Insert_Input;
  on_conflict?: InputMaybe<AuthUserProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserProvidersArgs = {
  objects: Array<AuthUserProviders_Insert_Input>;
  on_conflict?: InputMaybe<AuthUserProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserRoleArgs = {
  object: AuthUserRoles_Insert_Input;
  on_conflict?: InputMaybe<AuthUserRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserRolesArgs = {
  objects: Array<AuthUserRoles_Insert_Input>;
  on_conflict?: InputMaybe<AuthUserRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertUserArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FoodArgs = {
  objects: Array<Food_Insert_Input>;
  on_conflict?: InputMaybe<Food_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_AttributeArgs = {
  objects: Array<Food_Attribute_Insert_Input>;
  on_conflict?: InputMaybe<Food_Attribute_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_Attribute_OneArgs = {
  object: Food_Attribute_Insert_Input;
  on_conflict?: InputMaybe<Food_Attribute_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_Attribute_TypeArgs = {
  objects: Array<Food_Attribute_Type_Insert_Input>;
  on_conflict?: InputMaybe<Food_Attribute_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_Attribute_Type_OneArgs = {
  object: Food_Attribute_Type_Insert_Input;
  on_conflict?: InputMaybe<Food_Attribute_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_CategoryArgs = {
  objects: Array<Food_Category_Insert_Input>;
  on_conflict?: InputMaybe<Food_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_Category_OneArgs = {
  object: Food_Category_Insert_Input;
  on_conflict?: InputMaybe<Food_Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_NutrientArgs = {
  objects: Array<Food_Nutrient_Insert_Input>;
  on_conflict?: InputMaybe<Food_Nutrient_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_Nutrient_OneArgs = {
  object: Food_Nutrient_Insert_Input;
  on_conflict?: InputMaybe<Food_Nutrient_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_OneArgs = {
  object: Food_Insert_Input;
  on_conflict?: InputMaybe<Food_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_PortionArgs = {
  objects: Array<Food_Portion_Insert_Input>;
  on_conflict?: InputMaybe<Food_Portion_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Food_Portion_OneArgs = {
  object: Food_Portion_Insert_Input;
  on_conflict?: InputMaybe<Food_Portion_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Measure_UnitArgs = {
  objects: Array<Measure_Unit_Insert_Input>;
  on_conflict?: InputMaybe<Measure_Unit_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Measure_Unit_OneArgs = {
  object: Measure_Unit_Insert_Input;
  on_conflict?: InputMaybe<Measure_Unit_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_NutrientArgs = {
  objects: Array<Nutrient_Insert_Input>;
  on_conflict?: InputMaybe<Nutrient_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Nutrient_OneArgs = {
  object: Nutrient_Insert_Input;
  on_conflict?: InputMaybe<Nutrient_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Direction_ActionsArgs = {
  objects: Array<Recipe_Direction_Actions_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Direction_Actions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Direction_Actions_OneArgs = {
  object: Recipe_Direction_Actions_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Direction_Actions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Direction_DurationsArgs = {
  objects: Array<Recipe_Direction_Durations_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Direction_Durations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Direction_Durations_OneArgs = {
  object: Recipe_Direction_Durations_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Direction_Durations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_DirectionsArgs = {
  objects: Array<Recipe_Directions_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Directions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Directions_OneArgs = {
  object: Recipe_Directions_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Directions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_FavoriteArgs = {
  objects: Array<Recipe_Favorite_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Favorite_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Favorite_OneArgs = {
  object: Recipe_Favorite_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Favorite_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Ingredient_Food_CandidateArgs = {
  objects: Array<Recipe_Ingredient_Food_Candidate_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Ingredient_Food_Candidate_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Ingredient_Food_Candidate_OneArgs = {
  object: Recipe_Ingredient_Food_Candidate_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Ingredient_Food_Candidate_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Ingredient_GroupsArgs = {
  objects: Array<Recipe_Ingredient_Groups_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Ingredient_Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Ingredient_Groups_OneArgs = {
  object: Recipe_Ingredient_Groups_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Ingredient_Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_IngredientsArgs = {
  objects: Array<Recipe_Ingredients_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Ingredients_OneArgs = {
  object: Recipe_Ingredients_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_List_ItemsArgs = {
  objects: Array<Recipe_List_Items_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_List_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_List_Items_OneArgs = {
  object: Recipe_List_Items_Insert_Input;
  on_conflict?: InputMaybe<Recipe_List_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_ListsArgs = {
  objects: Array<Recipe_Lists_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Lists_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Lists_OneArgs = {
  object: Recipe_Lists_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Lists_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_TagsArgs = {
  objects: Array<Recipe_Tags_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Tags_OneArgs = {
  object: Recipe_Tags_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RecipesArgs = {
  objects: Array<Recipes_Insert_Input>;
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipes_OneArgs = {
  object: Recipes_Insert_Input;
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_ConfigArgs = {
  objects: Array<User_Config_Insert_Input>;
  on_conflict?: InputMaybe<User_Config_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Config_OneArgs = {
  object: User_Config_Insert_Input;
  on_conflict?: InputMaybe<User_Config_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderArgs = {
  _set?: InputMaybe<AuthProviders_Set_Input>;
  pk_columns: AuthProviders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderRequestArgs = {
  _set?: InputMaybe<AuthProviderRequests_Set_Input>;
  pk_columns: AuthProviderRequests_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderRequestsArgs = {
  _set?: InputMaybe<AuthProviderRequests_Set_Input>;
  where: AuthProviderRequests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthProvidersArgs = {
  _set?: InputMaybe<AuthProviders_Set_Input>;
  where: AuthProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokenArgs = {
  _set?: InputMaybe<AuthRefreshTokens_Set_Input>;
  pk_columns: AuthRefreshTokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokensArgs = {
  _set?: InputMaybe<AuthRefreshTokens_Set_Input>;
  where: AuthRefreshTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthRoleArgs = {
  _set?: InputMaybe<AuthRoles_Set_Input>;
  pk_columns: AuthRoles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthRolesArgs = {
  _set?: InputMaybe<AuthRoles_Set_Input>;
  where: AuthRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserProviderArgs = {
  _set?: InputMaybe<AuthUserProviders_Set_Input>;
  pk_columns: AuthUserProviders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserProvidersArgs = {
  _set?: InputMaybe<AuthUserProviders_Set_Input>;
  where: AuthUserProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserRoleArgs = {
  _set?: InputMaybe<AuthUserRoles_Set_Input>;
  pk_columns: AuthUserRoles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserRolesArgs = {
  _set?: InputMaybe<AuthUserRoles_Set_Input>;
  where: AuthUserRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateUserArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_FoodArgs = {
  _inc?: InputMaybe<Food_Inc_Input>;
  _set?: InputMaybe<Food_Set_Input>;
  where: Food_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Food_AttributeArgs = {
  _inc?: InputMaybe<Food_Attribute_Inc_Input>;
  _set?: InputMaybe<Food_Attribute_Set_Input>;
  where: Food_Attribute_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Food_Attribute_By_PkArgs = {
  _inc?: InputMaybe<Food_Attribute_Inc_Input>;
  _set?: InputMaybe<Food_Attribute_Set_Input>;
  pk_columns: Food_Attribute_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Food_Attribute_TypeArgs = {
  _inc?: InputMaybe<Food_Attribute_Type_Inc_Input>;
  _set?: InputMaybe<Food_Attribute_Type_Set_Input>;
  where: Food_Attribute_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Food_Attribute_Type_By_PkArgs = {
  _inc?: InputMaybe<Food_Attribute_Type_Inc_Input>;
  _set?: InputMaybe<Food_Attribute_Type_Set_Input>;
  pk_columns: Food_Attribute_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Food_By_PkArgs = {
  _inc?: InputMaybe<Food_Inc_Input>;
  _set?: InputMaybe<Food_Set_Input>;
  pk_columns: Food_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Food_CategoryArgs = {
  _inc?: InputMaybe<Food_Category_Inc_Input>;
  _set?: InputMaybe<Food_Category_Set_Input>;
  where: Food_Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Food_Category_By_PkArgs = {
  _inc?: InputMaybe<Food_Category_Inc_Input>;
  _set?: InputMaybe<Food_Category_Set_Input>;
  pk_columns: Food_Category_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Food_NutrientArgs = {
  _inc?: InputMaybe<Food_Nutrient_Inc_Input>;
  _set?: InputMaybe<Food_Nutrient_Set_Input>;
  where: Food_Nutrient_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Food_Nutrient_By_PkArgs = {
  _inc?: InputMaybe<Food_Nutrient_Inc_Input>;
  _set?: InputMaybe<Food_Nutrient_Set_Input>;
  pk_columns: Food_Nutrient_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Food_PortionArgs = {
  _inc?: InputMaybe<Food_Portion_Inc_Input>;
  _set?: InputMaybe<Food_Portion_Set_Input>;
  where: Food_Portion_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Food_Portion_By_PkArgs = {
  _inc?: InputMaybe<Food_Portion_Inc_Input>;
  _set?: InputMaybe<Food_Portion_Set_Input>;
  pk_columns: Food_Portion_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Measure_UnitArgs = {
  _inc?: InputMaybe<Measure_Unit_Inc_Input>;
  _set?: InputMaybe<Measure_Unit_Set_Input>;
  where: Measure_Unit_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Measure_Unit_By_PkArgs = {
  _inc?: InputMaybe<Measure_Unit_Inc_Input>;
  _set?: InputMaybe<Measure_Unit_Set_Input>;
  pk_columns: Measure_Unit_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_NutrientArgs = {
  _inc?: InputMaybe<Nutrient_Inc_Input>;
  _set?: InputMaybe<Nutrient_Set_Input>;
  where: Nutrient_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Nutrient_By_PkArgs = {
  _inc?: InputMaybe<Nutrient_Inc_Input>;
  _set?: InputMaybe<Nutrient_Set_Input>;
  pk_columns: Nutrient_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Direction_ActionsArgs = {
  _append?: InputMaybe<Recipe_Direction_Actions_Append_Input>;
  _delete_at_path?: InputMaybe<Recipe_Direction_Actions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Recipe_Direction_Actions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Recipe_Direction_Actions_Delete_Key_Input>;
  _inc?: InputMaybe<Recipe_Direction_Actions_Inc_Input>;
  _prepend?: InputMaybe<Recipe_Direction_Actions_Prepend_Input>;
  _set?: InputMaybe<Recipe_Direction_Actions_Set_Input>;
  where: Recipe_Direction_Actions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Direction_Actions_By_PkArgs = {
  _append?: InputMaybe<Recipe_Direction_Actions_Append_Input>;
  _delete_at_path?: InputMaybe<Recipe_Direction_Actions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Recipe_Direction_Actions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Recipe_Direction_Actions_Delete_Key_Input>;
  _inc?: InputMaybe<Recipe_Direction_Actions_Inc_Input>;
  _prepend?: InputMaybe<Recipe_Direction_Actions_Prepend_Input>;
  _set?: InputMaybe<Recipe_Direction_Actions_Set_Input>;
  pk_columns: Recipe_Direction_Actions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Direction_DurationsArgs = {
  _inc?: InputMaybe<Recipe_Direction_Durations_Inc_Input>;
  _set?: InputMaybe<Recipe_Direction_Durations_Set_Input>;
  where: Recipe_Direction_Durations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Direction_Durations_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Direction_Durations_Inc_Input>;
  _set?: InputMaybe<Recipe_Direction_Durations_Set_Input>;
  pk_columns: Recipe_Direction_Durations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_DirectionsArgs = {
  _inc?: InputMaybe<Recipe_Directions_Inc_Input>;
  _set?: InputMaybe<Recipe_Directions_Set_Input>;
  where: Recipe_Directions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Directions_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Directions_Inc_Input>;
  _set?: InputMaybe<Recipe_Directions_Set_Input>;
  pk_columns: Recipe_Directions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_FavoriteArgs = {
  _inc?: InputMaybe<Recipe_Favorite_Inc_Input>;
  _set?: InputMaybe<Recipe_Favorite_Set_Input>;
  where: Recipe_Favorite_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Favorite_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Favorite_Inc_Input>;
  _set?: InputMaybe<Recipe_Favorite_Set_Input>;
  pk_columns: Recipe_Favorite_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Ingredient_Food_CandidateArgs = {
  _inc?: InputMaybe<Recipe_Ingredient_Food_Candidate_Inc_Input>;
  _set?: InputMaybe<Recipe_Ingredient_Food_Candidate_Set_Input>;
  where: Recipe_Ingredient_Food_Candidate_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Ingredient_Food_Candidate_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Ingredient_Food_Candidate_Inc_Input>;
  _set?: InputMaybe<Recipe_Ingredient_Food_Candidate_Set_Input>;
  pk_columns: Recipe_Ingredient_Food_Candidate_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Ingredient_GroupsArgs = {
  _inc?: InputMaybe<Recipe_Ingredient_Groups_Inc_Input>;
  _set?: InputMaybe<Recipe_Ingredient_Groups_Set_Input>;
  where: Recipe_Ingredient_Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Ingredient_Groups_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Ingredient_Groups_Inc_Input>;
  _set?: InputMaybe<Recipe_Ingredient_Groups_Set_Input>;
  pk_columns: Recipe_Ingredient_Groups_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_IngredientsArgs = {
  _inc?: InputMaybe<Recipe_Ingredients_Inc_Input>;
  _set?: InputMaybe<Recipe_Ingredients_Set_Input>;
  where: Recipe_Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Ingredients_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Ingredients_Inc_Input>;
  _set?: InputMaybe<Recipe_Ingredients_Set_Input>;
  pk_columns: Recipe_Ingredients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_List_ItemsArgs = {
  _inc?: InputMaybe<Recipe_List_Items_Inc_Input>;
  _set?: InputMaybe<Recipe_List_Items_Set_Input>;
  where: Recipe_List_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_List_Items_By_PkArgs = {
  _inc?: InputMaybe<Recipe_List_Items_Inc_Input>;
  _set?: InputMaybe<Recipe_List_Items_Set_Input>;
  pk_columns: Recipe_List_Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_ListsArgs = {
  _inc?: InputMaybe<Recipe_Lists_Inc_Input>;
  _set?: InputMaybe<Recipe_Lists_Set_Input>;
  where: Recipe_Lists_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Lists_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Lists_Inc_Input>;
  _set?: InputMaybe<Recipe_Lists_Set_Input>;
  pk_columns: Recipe_Lists_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_TagsArgs = {
  _inc?: InputMaybe<Recipe_Tags_Inc_Input>;
  _set?: InputMaybe<Recipe_Tags_Set_Input>;
  where: Recipe_Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Tags_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Tags_Inc_Input>;
  _set?: InputMaybe<Recipe_Tags_Set_Input>;
  pk_columns: Recipe_Tags_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_RecipesArgs = {
  _append?: InputMaybe<Recipes_Append_Input>;
  _delete_at_path?: InputMaybe<Recipes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Recipes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Recipes_Delete_Key_Input>;
  _inc?: InputMaybe<Recipes_Inc_Input>;
  _prepend?: InputMaybe<Recipes_Prepend_Input>;
  _set?: InputMaybe<Recipes_Set_Input>;
  where: Recipes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipes_By_PkArgs = {
  _append?: InputMaybe<Recipes_Append_Input>;
  _delete_at_path?: InputMaybe<Recipes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Recipes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Recipes_Delete_Key_Input>;
  _inc?: InputMaybe<Recipes_Inc_Input>;
  _prepend?: InputMaybe<Recipes_Prepend_Input>;
  _set?: InputMaybe<Recipes_Set_Input>;
  pk_columns: Recipes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_ConfigArgs = {
  _inc?: InputMaybe<User_Config_Inc_Input>;
  _set?: InputMaybe<User_Config_Set_Input>;
  where: User_Config_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Config_By_PkArgs = {
  _inc?: InputMaybe<User_Config_Inc_Input>;
  _set?: InputMaybe<User_Config_Set_Input>;
  pk_columns: User_Config_Pk_Columns_Input;
};

/** columns and relationships of "nutrient" */
export type Nutrient = {
  __typename?: 'nutrient';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  nutrient_nbr?: Maybe<Scalars['Int']>;
  rank?: Maybe<Scalars['Int']>;
  unit_name?: Maybe<Scalars['String']>;
};

/** aggregated selection of "nutrient" */
export type Nutrient_Aggregate = {
  __typename?: 'nutrient_aggregate';
  aggregate?: Maybe<Nutrient_Aggregate_Fields>;
  nodes: Array<Nutrient>;
};

/** aggregate fields of "nutrient" */
export type Nutrient_Aggregate_Fields = {
  __typename?: 'nutrient_aggregate_fields';
  avg?: Maybe<Nutrient_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Nutrient_Max_Fields>;
  min?: Maybe<Nutrient_Min_Fields>;
  stddev?: Maybe<Nutrient_Stddev_Fields>;
  stddev_pop?: Maybe<Nutrient_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Nutrient_Stddev_Samp_Fields>;
  sum?: Maybe<Nutrient_Sum_Fields>;
  var_pop?: Maybe<Nutrient_Var_Pop_Fields>;
  var_samp?: Maybe<Nutrient_Var_Samp_Fields>;
  variance?: Maybe<Nutrient_Variance_Fields>;
};


/** aggregate fields of "nutrient" */
export type Nutrient_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Nutrient_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Nutrient_Avg_Fields = {
  __typename?: 'nutrient_avg_fields';
  id?: Maybe<Scalars['Float']>;
  nutrient_nbr?: Maybe<Scalars['Float']>;
  rank?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "nutrient". All fields are combined with a logical 'AND'. */
export type Nutrient_Bool_Exp = {
  _and?: InputMaybe<Array<Nutrient_Bool_Exp>>;
  _not?: InputMaybe<Nutrient_Bool_Exp>;
  _or?: InputMaybe<Array<Nutrient_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nutrient_nbr?: InputMaybe<Int_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  unit_name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "nutrient" */
export enum Nutrient_Constraint {
  /** unique or primary key constraint */
  NutrientPkey = 'nutrient_pkey'
}

/** input type for incrementing numeric columns in table "nutrient" */
export type Nutrient_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  nutrient_nbr?: InputMaybe<Scalars['Int']>;
  rank?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "nutrient" */
export type Nutrient_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  nutrient_nbr?: InputMaybe<Scalars['Int']>;
  rank?: InputMaybe<Scalars['Int']>;
  unit_name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Nutrient_Max_Fields = {
  __typename?: 'nutrient_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  nutrient_nbr?: Maybe<Scalars['Int']>;
  rank?: Maybe<Scalars['Int']>;
  unit_name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Nutrient_Min_Fields = {
  __typename?: 'nutrient_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  nutrient_nbr?: Maybe<Scalars['Int']>;
  rank?: Maybe<Scalars['Int']>;
  unit_name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "nutrient" */
export type Nutrient_Mutation_Response = {
  __typename?: 'nutrient_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Nutrient>;
};

/** input type for inserting object relation for remote table "nutrient" */
export type Nutrient_Obj_Rel_Insert_Input = {
  data: Nutrient_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Nutrient_On_Conflict>;
};

/** on conflict condition type for table "nutrient" */
export type Nutrient_On_Conflict = {
  constraint: Nutrient_Constraint;
  update_columns?: Array<Nutrient_Update_Column>;
  where?: InputMaybe<Nutrient_Bool_Exp>;
};

/** Ordering options when selecting data from "nutrient". */
export type Nutrient_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nutrient_nbr?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  unit_name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: nutrient */
export type Nutrient_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "nutrient" */
export enum Nutrient_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  NutrientNbr = 'nutrient_nbr',
  /** column name */
  Rank = 'rank',
  /** column name */
  UnitName = 'unit_name'
}

/** input type for updating data in table "nutrient" */
export type Nutrient_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  nutrient_nbr?: InputMaybe<Scalars['Int']>;
  rank?: InputMaybe<Scalars['Int']>;
  unit_name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Nutrient_Stddev_Fields = {
  __typename?: 'nutrient_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  nutrient_nbr?: Maybe<Scalars['Float']>;
  rank?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Nutrient_Stddev_Pop_Fields = {
  __typename?: 'nutrient_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  nutrient_nbr?: Maybe<Scalars['Float']>;
  rank?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Nutrient_Stddev_Samp_Fields = {
  __typename?: 'nutrient_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  nutrient_nbr?: Maybe<Scalars['Float']>;
  rank?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Nutrient_Sum_Fields = {
  __typename?: 'nutrient_sum_fields';
  id?: Maybe<Scalars['Int']>;
  nutrient_nbr?: Maybe<Scalars['Int']>;
  rank?: Maybe<Scalars['Int']>;
};

/** update columns of table "nutrient" */
export enum Nutrient_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  NutrientNbr = 'nutrient_nbr',
  /** column name */
  Rank = 'rank',
  /** column name */
  UnitName = 'unit_name'
}

/** aggregate var_pop on columns */
export type Nutrient_Var_Pop_Fields = {
  __typename?: 'nutrient_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  nutrient_nbr?: Maybe<Scalars['Float']>;
  rank?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Nutrient_Var_Samp_Fields = {
  __typename?: 'nutrient_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  nutrient_nbr?: Maybe<Scalars['Float']>;
  rank?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Nutrient_Variance_Fields = {
  __typename?: 'nutrient_variance_fields';
  id?: Maybe<Scalars['Float']>;
  nutrient_nbr?: Maybe<Scalars['Float']>;
  rank?: Maybe<Scalars['Float']>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "auth.providers" using primary key columns */
  authProvider?: Maybe<AuthProviders>;
  /** fetch data from the table: "auth.provider_requests" using primary key columns */
  authProviderRequest?: Maybe<AuthProviderRequests>;
  /** fetch data from the table: "auth.provider_requests" */
  authProviderRequests: Array<AuthProviderRequests>;
  /** fetch aggregated fields from the table: "auth.provider_requests" */
  authProviderRequestsAggregate: AuthProviderRequests_Aggregate;
  /** fetch data from the table: "auth.providers" */
  authProviders: Array<AuthProviders>;
  /** fetch aggregated fields from the table: "auth.providers" */
  authProvidersAggregate: AuthProviders_Aggregate;
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  authRefreshToken?: Maybe<AuthRefreshTokens>;
  /** fetch data from the table: "auth.refresh_tokens" */
  authRefreshTokens: Array<AuthRefreshTokens>;
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  authRefreshTokensAggregate: AuthRefreshTokens_Aggregate;
  /** fetch data from the table: "auth.roles" using primary key columns */
  authRole?: Maybe<AuthRoles>;
  /** fetch data from the table: "auth.roles" */
  authRoles: Array<AuthRoles>;
  /** fetch aggregated fields from the table: "auth.roles" */
  authRolesAggregate: AuthRoles_Aggregate;
  /** fetch data from the table: "auth.user_providers" using primary key columns */
  authUserProvider?: Maybe<AuthUserProviders>;
  /** fetch data from the table: "auth.user_providers" */
  authUserProviders: Array<AuthUserProviders>;
  /** fetch aggregated fields from the table: "auth.user_providers" */
  authUserProvidersAggregate: AuthUserProviders_Aggregate;
  /** fetch data from the table: "auth.user_roles" using primary key columns */
  authUserRole?: Maybe<AuthUserRoles>;
  /** fetch data from the table: "auth.user_roles" */
  authUserRoles: Array<AuthUserRoles>;
  /** fetch aggregated fields from the table: "auth.user_roles" */
  authUserRolesAggregate: AuthUserRoles_Aggregate;
  /** fetch data from the table: "food" */
  food: Array<Food>;
  /** fetch aggregated fields from the table: "food" */
  food_aggregate: Food_Aggregate;
  /** fetch data from the table: "food_attribute" */
  food_attribute: Array<Food_Attribute>;
  /** fetch aggregated fields from the table: "food_attribute" */
  food_attribute_aggregate: Food_Attribute_Aggregate;
  /** fetch data from the table: "food_attribute" using primary key columns */
  food_attribute_by_pk?: Maybe<Food_Attribute>;
  /** fetch data from the table: "food_attribute_type" */
  food_attribute_type: Array<Food_Attribute_Type>;
  /** fetch aggregated fields from the table: "food_attribute_type" */
  food_attribute_type_aggregate: Food_Attribute_Type_Aggregate;
  /** fetch data from the table: "food_attribute_type" using primary key columns */
  food_attribute_type_by_pk?: Maybe<Food_Attribute_Type>;
  /** fetch data from the table: "food" using primary key columns */
  food_by_pk?: Maybe<Food>;
  /** fetch data from the table: "food_category" */
  food_category: Array<Food_Category>;
  /** fetch aggregated fields from the table: "food_category" */
  food_category_aggregate: Food_Category_Aggregate;
  /** fetch data from the table: "food_category" using primary key columns */
  food_category_by_pk?: Maybe<Food_Category>;
  /** fetch data from the table: "food_nutrient" */
  food_nutrient: Array<Food_Nutrient>;
  /** fetch aggregated fields from the table: "food_nutrient" */
  food_nutrient_aggregate: Food_Nutrient_Aggregate;
  /** fetch data from the table: "food_nutrient" using primary key columns */
  food_nutrient_by_pk?: Maybe<Food_Nutrient>;
  /** fetch data from the table: "food_portion" */
  food_portion: Array<Food_Portion>;
  /** fetch aggregated fields from the table: "food_portion" */
  food_portion_aggregate: Food_Portion_Aggregate;
  /** fetch data from the table: "food_portion" using primary key columns */
  food_portion_by_pk?: Maybe<Food_Portion>;
  /** fetch data from the table: "measure_unit" */
  measure_unit: Array<Measure_Unit>;
  /** fetch aggregated fields from the table: "measure_unit" */
  measure_unit_aggregate: Measure_Unit_Aggregate;
  /** fetch data from the table: "measure_unit" using primary key columns */
  measure_unit_by_pk?: Maybe<Measure_Unit>;
  /** fetch data from the table: "nutrient" */
  nutrient: Array<Nutrient>;
  /** fetch aggregated fields from the table: "nutrient" */
  nutrient_aggregate: Nutrient_Aggregate;
  /** fetch data from the table: "nutrient" using primary key columns */
  nutrient_by_pk?: Maybe<Nutrient>;
  /** An array relationship */
  recipe_direction_actions: Array<Recipe_Direction_Actions>;
  /** An aggregate relationship */
  recipe_direction_actions_aggregate: Recipe_Direction_Actions_Aggregate;
  /** fetch data from the table: "recipe_direction_actions" using primary key columns */
  recipe_direction_actions_by_pk?: Maybe<Recipe_Direction_Actions>;
  /** An array relationship */
  recipe_direction_durations: Array<Recipe_Direction_Durations>;
  /** An aggregate relationship */
  recipe_direction_durations_aggregate: Recipe_Direction_Durations_Aggregate;
  /** fetch data from the table: "recipe_direction_durations" using primary key columns */
  recipe_direction_durations_by_pk?: Maybe<Recipe_Direction_Durations>;
  /** An array relationship */
  recipe_directions: Array<Recipe_Directions>;
  /** An aggregate relationship */
  recipe_directions_aggregate: Recipe_Directions_Aggregate;
  /** fetch data from the table: "recipe_directions" using primary key columns */
  recipe_directions_by_pk?: Maybe<Recipe_Directions>;
  /** fetch data from the table: "recipe_favorite" */
  recipe_favorite: Array<Recipe_Favorite>;
  /** fetch aggregated fields from the table: "recipe_favorite" */
  recipe_favorite_aggregate: Recipe_Favorite_Aggregate;
  /** fetch data from the table: "recipe_favorite" using primary key columns */
  recipe_favorite_by_pk?: Maybe<Recipe_Favorite>;
  /** fetch data from the table: "recipe_ingredient_food_candidate" */
  recipe_ingredient_food_candidate: Array<Recipe_Ingredient_Food_Candidate>;
  /** fetch aggregated fields from the table: "recipe_ingredient_food_candidate" */
  recipe_ingredient_food_candidate_aggregate: Recipe_Ingredient_Food_Candidate_Aggregate;
  /** fetch data from the table: "recipe_ingredient_food_candidate" using primary key columns */
  recipe_ingredient_food_candidate_by_pk?: Maybe<Recipe_Ingredient_Food_Candidate>;
  /** An array relationship */
  recipe_ingredient_groups: Array<Recipe_Ingredient_Groups>;
  /** An aggregate relationship */
  recipe_ingredient_groups_aggregate: Recipe_Ingredient_Groups_Aggregate;
  /** fetch data from the table: "recipe_ingredient_groups" using primary key columns */
  recipe_ingredient_groups_by_pk?: Maybe<Recipe_Ingredient_Groups>;
  /** fetch data from the table: "recipe_ingredients" */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** fetch aggregated fields from the table: "recipe_ingredients" */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  /** fetch data from the table: "recipe_ingredients" using primary key columns */
  recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** An array relationship */
  recipe_list_items: Array<Recipe_List_Items>;
  /** An aggregate relationship */
  recipe_list_items_aggregate: Recipe_List_Items_Aggregate;
  /** fetch data from the table: "recipe_list_items" using primary key columns */
  recipe_list_items_by_pk?: Maybe<Recipe_List_Items>;
  /** fetch data from the table: "recipe_lists" */
  recipe_lists: Array<Recipe_Lists>;
  /** fetch aggregated fields from the table: "recipe_lists" */
  recipe_lists_aggregate: Recipe_Lists_Aggregate;
  /** fetch data from the table: "recipe_lists" using primary key columns */
  recipe_lists_by_pk?: Maybe<Recipe_Lists>;
  /** fetch data from the table: "recipe_tags" */
  recipe_tags: Array<Recipe_Tags>;
  /** fetch aggregated fields from the table: "recipe_tags" */
  recipe_tags_aggregate: Recipe_Tags_Aggregate;
  /** fetch data from the table: "recipe_tags" using primary key columns */
  recipe_tags_by_pk?: Maybe<Recipe_Tags>;
  /** fetch data from the table: "recipes" */
  recipes: Array<Recipes>;
  /** fetch aggregated fields from the table: "recipes" */
  recipes_aggregate: Recipes_Aggregate;
  /** fetch data from the table: "recipes" using primary key columns */
  recipes_by_pk?: Maybe<Recipes>;
  /** execute function "search_foods" which returns "food" */
  search_foods: Array<Food>;
  /** execute function "search_foods" and query aggregates on result of table type "food" */
  search_foods_aggregate: Food_Aggregate;
  /** execute function "search_recipes" which returns "recipes" */
  search_recipes: Array<Recipes>;
  /** execute function "search_recipes" and query aggregates on result of table type "recipes" */
  search_recipes_aggregate: Recipes_Aggregate;
  /** fetch data from the table: "auth.users" using primary key columns */
  user?: Maybe<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  userAggregate: Users_Aggregate;
  /** fetch data from the table: "user_config" */
  user_config: Array<User_Config>;
  /** fetch aggregated fields from the table: "user_config" */
  user_config_aggregate: User_Config_Aggregate;
  /** fetch data from the table: "user_config" using primary key columns */
  user_config_by_pk?: Maybe<User_Config>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
};


export type Query_RootAuthProviderArgs = {
  id: Scalars['String'];
};


export type Query_RootAuthProviderRequestArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthProviderRequestsArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Query_RootAuthProviderRequestsAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Query_RootAuthProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Query_RootAuthProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Query_RootAuthRefreshTokenArgs = {
  refreshToken: Scalars['uuid'];
};


export type Query_RootAuthRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Query_RootAuthRefreshTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Query_RootAuthRoleArgs = {
  role: Scalars['String'];
};


export type Query_RootAuthRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Query_RootAuthRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Query_RootAuthUserProviderArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Query_RootAuthUserProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Query_RootAuthUserRoleArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthUserRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Query_RootAuthUserRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Query_RootFoodArgs = {
  distinct_on?: InputMaybe<Array<Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Order_By>>;
  where?: InputMaybe<Food_Bool_Exp>;
};


export type Query_RootFood_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Order_By>>;
  where?: InputMaybe<Food_Bool_Exp>;
};


export type Query_RootFood_AttributeArgs = {
  distinct_on?: InputMaybe<Array<Food_Attribute_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Attribute_Order_By>>;
  where?: InputMaybe<Food_Attribute_Bool_Exp>;
};


export type Query_RootFood_Attribute_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Attribute_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Attribute_Order_By>>;
  where?: InputMaybe<Food_Attribute_Bool_Exp>;
};


export type Query_RootFood_Attribute_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootFood_Attribute_TypeArgs = {
  distinct_on?: InputMaybe<Array<Food_Attribute_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Attribute_Type_Order_By>>;
  where?: InputMaybe<Food_Attribute_Type_Bool_Exp>;
};


export type Query_RootFood_Attribute_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Attribute_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Attribute_Type_Order_By>>;
  where?: InputMaybe<Food_Attribute_Type_Bool_Exp>;
};


export type Query_RootFood_Attribute_Type_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootFood_By_PkArgs = {
  fdc_id: Scalars['Int'];
};


export type Query_RootFood_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Food_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Category_Order_By>>;
  where?: InputMaybe<Food_Category_Bool_Exp>;
};


export type Query_RootFood_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Category_Order_By>>;
  where?: InputMaybe<Food_Category_Bool_Exp>;
};


export type Query_RootFood_Category_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootFood_NutrientArgs = {
  distinct_on?: InputMaybe<Array<Food_Nutrient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Nutrient_Order_By>>;
  where?: InputMaybe<Food_Nutrient_Bool_Exp>;
};


export type Query_RootFood_Nutrient_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Nutrient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Nutrient_Order_By>>;
  where?: InputMaybe<Food_Nutrient_Bool_Exp>;
};


export type Query_RootFood_Nutrient_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootFood_PortionArgs = {
  distinct_on?: InputMaybe<Array<Food_Portion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Portion_Order_By>>;
  where?: InputMaybe<Food_Portion_Bool_Exp>;
};


export type Query_RootFood_Portion_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Portion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Portion_Order_By>>;
  where?: InputMaybe<Food_Portion_Bool_Exp>;
};


export type Query_RootFood_Portion_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootMeasure_UnitArgs = {
  distinct_on?: InputMaybe<Array<Measure_Unit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Measure_Unit_Order_By>>;
  where?: InputMaybe<Measure_Unit_Bool_Exp>;
};


export type Query_RootMeasure_Unit_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Measure_Unit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Measure_Unit_Order_By>>;
  where?: InputMaybe<Measure_Unit_Bool_Exp>;
};


export type Query_RootMeasure_Unit_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootNutrientArgs = {
  distinct_on?: InputMaybe<Array<Nutrient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Nutrient_Order_By>>;
  where?: InputMaybe<Nutrient_Bool_Exp>;
};


export type Query_RootNutrient_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nutrient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Nutrient_Order_By>>;
  where?: InputMaybe<Nutrient_Bool_Exp>;
};


export type Query_RootNutrient_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipe_Direction_ActionsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Actions_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Actions_Bool_Exp>;
};


export type Query_RootRecipe_Direction_Actions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Actions_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Actions_Bool_Exp>;
};


export type Query_RootRecipe_Direction_Actions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipe_Direction_DurationsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Durations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Durations_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Durations_Bool_Exp>;
};


export type Query_RootRecipe_Direction_Durations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Durations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Durations_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Durations_Bool_Exp>;
};


export type Query_RootRecipe_Direction_Durations_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipe_DirectionsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Directions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Directions_Order_By>>;
  where?: InputMaybe<Recipe_Directions_Bool_Exp>;
};


export type Query_RootRecipe_Directions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Directions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Directions_Order_By>>;
  where?: InputMaybe<Recipe_Directions_Bool_Exp>;
};


export type Query_RootRecipe_Directions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipe_FavoriteArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Favorite_Order_By>>;
  where?: InputMaybe<Recipe_Favorite_Bool_Exp>;
};


export type Query_RootRecipe_Favorite_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Favorite_Order_By>>;
  where?: InputMaybe<Recipe_Favorite_Bool_Exp>;
};


export type Query_RootRecipe_Favorite_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootRecipe_Ingredient_Food_CandidateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Food_Candidate_Bool_Exp>;
};


export type Query_RootRecipe_Ingredient_Food_Candidate_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Food_Candidate_Bool_Exp>;
};


export type Query_RootRecipe_Ingredient_Food_Candidate_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipe_Ingredient_GroupsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Groups_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Groups_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Groups_Bool_Exp>;
};


export type Query_RootRecipe_Ingredient_Groups_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Groups_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Groups_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Groups_Bool_Exp>;
};


export type Query_RootRecipe_Ingredient_Groups_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Query_RootRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Query_RootRecipe_Ingredients_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipe_List_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_List_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_List_Items_Order_By>>;
  where?: InputMaybe<Recipe_List_Items_Bool_Exp>;
};


export type Query_RootRecipe_List_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_List_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_List_Items_Order_By>>;
  where?: InputMaybe<Recipe_List_Items_Bool_Exp>;
};


export type Query_RootRecipe_List_Items_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipe_ListsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Lists_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Lists_Order_By>>;
  where?: InputMaybe<Recipe_Lists_Bool_Exp>;
};


export type Query_RootRecipe_Lists_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Lists_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Lists_Order_By>>;
  where?: InputMaybe<Recipe_Lists_Bool_Exp>;
};


export type Query_RootRecipe_Lists_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipe_TagsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Tags_Order_By>>;
  where?: InputMaybe<Recipe_Tags_Bool_Exp>;
};


export type Query_RootRecipe_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Tags_Order_By>>;
  where?: InputMaybe<Recipe_Tags_Bool_Exp>;
};


export type Query_RootRecipe_Tags_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootRecipesArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Query_RootRecipes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Query_RootRecipes_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootSearch_FoodsArgs = {
  args: Search_Foods_Args;
  distinct_on?: InputMaybe<Array<Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Order_By>>;
  where?: InputMaybe<Food_Bool_Exp>;
};


export type Query_RootSearch_Foods_AggregateArgs = {
  args: Search_Foods_Args;
  distinct_on?: InputMaybe<Array<Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Order_By>>;
  where?: InputMaybe<Food_Bool_Exp>;
};


export type Query_RootSearch_RecipesArgs = {
  args: Search_Recipes_Args;
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Query_RootSearch_Recipes_AggregateArgs = {
  args: Search_Recipes_Args;
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Query_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserAggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUser_ConfigArgs = {
  distinct_on?: InputMaybe<Array<User_Config_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Config_Order_By>>;
  where?: InputMaybe<User_Config_Bool_Exp>;
};


export type Query_RootUser_Config_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Config_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Config_Order_By>>;
  where?: InputMaybe<User_Config_Bool_Exp>;
};


export type Query_RootUser_Config_By_PkArgs = {
  user_id: Scalars['Int'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** columns and relationships of "recipe_direction_actions" */
export type Recipe_Direction_Actions = {
  __typename?: 'recipe_direction_actions';
  action: Scalars['String'];
  direction_id: Scalars['Int'];
  duration: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['jsonb'];
  quantity: Scalars['float8'];
  unit: Scalars['String'];
};


/** columns and relationships of "recipe_direction_actions" */
export type Recipe_Direction_ActionsNameArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "recipe_direction_actions" */
export type Recipe_Direction_Actions_Aggregate = {
  __typename?: 'recipe_direction_actions_aggregate';
  aggregate?: Maybe<Recipe_Direction_Actions_Aggregate_Fields>;
  nodes: Array<Recipe_Direction_Actions>;
};

/** aggregate fields of "recipe_direction_actions" */
export type Recipe_Direction_Actions_Aggregate_Fields = {
  __typename?: 'recipe_direction_actions_aggregate_fields';
  avg?: Maybe<Recipe_Direction_Actions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Direction_Actions_Max_Fields>;
  min?: Maybe<Recipe_Direction_Actions_Min_Fields>;
  stddev?: Maybe<Recipe_Direction_Actions_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Direction_Actions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Direction_Actions_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Direction_Actions_Sum_Fields>;
  var_pop?: Maybe<Recipe_Direction_Actions_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Direction_Actions_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Direction_Actions_Variance_Fields>;
};


/** aggregate fields of "recipe_direction_actions" */
export type Recipe_Direction_Actions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Direction_Actions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Direction_Actions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Direction_Actions_Max_Order_By>;
  min?: InputMaybe<Recipe_Direction_Actions_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Direction_Actions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Direction_Actions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Direction_Actions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Direction_Actions_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Direction_Actions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Direction_Actions_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Direction_Actions_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Recipe_Direction_Actions_Append_Input = {
  name?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Direction_Actions_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipe_Direction_Actions_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Direction_Actions_Avg_Fields = {
  __typename?: 'recipe_direction_actions_avg_fields';
  direction_id?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Avg_Order_By = {
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_direction_actions". All fields are combined with a logical 'AND'. */
export type Recipe_Direction_Actions_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Direction_Actions_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Direction_Actions_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Direction_Actions_Bool_Exp>>;
  action?: InputMaybe<String_Comparison_Exp>;
  direction_id?: InputMaybe<Int_Comparison_Exp>;
  duration?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<Jsonb_Comparison_Exp>;
  quantity?: InputMaybe<Float8_Comparison_Exp>;
  unit?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_direction_actions" */
export enum Recipe_Direction_Actions_Constraint {
  /** unique or primary key constraint */
  RecipeDirectionActionsPkey = 'recipe_direction_actions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Recipe_Direction_Actions_Delete_At_Path_Input = {
  name?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Recipe_Direction_Actions_Delete_Elem_Input = {
  name?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Recipe_Direction_Actions_Delete_Key_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Inc_Input = {
  direction_id?: InputMaybe<Scalars['Int']>;
  duration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  quantity?: InputMaybe<Scalars['float8']>;
};

/** input type for inserting data into table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Insert_Input = {
  action?: InputMaybe<Scalars['String']>;
  direction_id?: InputMaybe<Scalars['Int']>;
  duration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['jsonb']>;
  quantity?: InputMaybe<Scalars['float8']>;
  unit?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Recipe_Direction_Actions_Max_Fields = {
  __typename?: 'recipe_direction_actions_max_fields';
  action?: Maybe<Scalars['String']>;
  direction_id?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['float8']>;
  unit?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Max_Order_By = {
  action?: InputMaybe<Order_By>;
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Direction_Actions_Min_Fields = {
  __typename?: 'recipe_direction_actions_min_fields';
  action?: Maybe<Scalars['String']>;
  direction_id?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['float8']>;
  unit?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Min_Order_By = {
  action?: InputMaybe<Order_By>;
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Mutation_Response = {
  __typename?: 'recipe_direction_actions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Direction_Actions>;
};

/** on conflict condition type for table "recipe_direction_actions" */
export type Recipe_Direction_Actions_On_Conflict = {
  constraint: Recipe_Direction_Actions_Constraint;
  update_columns?: Array<Recipe_Direction_Actions_Update_Column>;
  where?: InputMaybe<Recipe_Direction_Actions_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_direction_actions". */
export type Recipe_Direction_Actions_Order_By = {
  action?: InputMaybe<Order_By>;
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_direction_actions */
export type Recipe_Direction_Actions_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Recipe_Direction_Actions_Prepend_Input = {
  name?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "recipe_direction_actions" */
export enum Recipe_Direction_Actions_Select_Column {
  /** column name */
  Action = 'action',
  /** column name */
  DirectionId = 'direction_id',
  /** column name */
  Duration = 'duration',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  Unit = 'unit'
}

/** input type for updating data in table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Set_Input = {
  action?: InputMaybe<Scalars['String']>;
  direction_id?: InputMaybe<Scalars['Int']>;
  duration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['jsonb']>;
  quantity?: InputMaybe<Scalars['float8']>;
  unit?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Recipe_Direction_Actions_Stddev_Fields = {
  __typename?: 'recipe_direction_actions_stddev_fields';
  direction_id?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Stddev_Order_By = {
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Direction_Actions_Stddev_Pop_Fields = {
  __typename?: 'recipe_direction_actions_stddev_pop_fields';
  direction_id?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Stddev_Pop_Order_By = {
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Direction_Actions_Stddev_Samp_Fields = {
  __typename?: 'recipe_direction_actions_stddev_samp_fields';
  direction_id?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Stddev_Samp_Order_By = {
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipe_Direction_Actions_Sum_Fields = {
  __typename?: 'recipe_direction_actions_sum_fields';
  direction_id?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['float8']>;
};

/** order by sum() on columns of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Sum_Order_By = {
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_direction_actions" */
export enum Recipe_Direction_Actions_Update_Column {
  /** column name */
  Action = 'action',
  /** column name */
  DirectionId = 'direction_id',
  /** column name */
  Duration = 'duration',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  Unit = 'unit'
}

/** aggregate var_pop on columns */
export type Recipe_Direction_Actions_Var_Pop_Fields = {
  __typename?: 'recipe_direction_actions_var_pop_fields';
  direction_id?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Var_Pop_Order_By = {
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Direction_Actions_Var_Samp_Fields = {
  __typename?: 'recipe_direction_actions_var_samp_fields';
  direction_id?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Var_Samp_Order_By = {
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Direction_Actions_Variance_Fields = {
  __typename?: 'recipe_direction_actions_variance_fields';
  direction_id?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipe_direction_actions" */
export type Recipe_Direction_Actions_Variance_Order_By = {
  direction_id?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipe_direction_durations" */
export type Recipe_Direction_Durations = {
  __typename?: 'recipe_direction_durations';
  duration: Scalars['Int'];
  id: Scalars['Int'];
  recipe_id: Scalars['Int'];
  seq_num: Scalars['Int'];
  type: Scalars['String'];
  unit_of_time: Scalars['String'];
};

/** aggregated selection of "recipe_direction_durations" */
export type Recipe_Direction_Durations_Aggregate = {
  __typename?: 'recipe_direction_durations_aggregate';
  aggregate?: Maybe<Recipe_Direction_Durations_Aggregate_Fields>;
  nodes: Array<Recipe_Direction_Durations>;
};

/** aggregate fields of "recipe_direction_durations" */
export type Recipe_Direction_Durations_Aggregate_Fields = {
  __typename?: 'recipe_direction_durations_aggregate_fields';
  avg?: Maybe<Recipe_Direction_Durations_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Direction_Durations_Max_Fields>;
  min?: Maybe<Recipe_Direction_Durations_Min_Fields>;
  stddev?: Maybe<Recipe_Direction_Durations_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Direction_Durations_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Direction_Durations_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Direction_Durations_Sum_Fields>;
  var_pop?: Maybe<Recipe_Direction_Durations_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Direction_Durations_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Direction_Durations_Variance_Fields>;
};


/** aggregate fields of "recipe_direction_durations" */
export type Recipe_Direction_Durations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Direction_Durations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Direction_Durations_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Direction_Durations_Max_Order_By>;
  min?: InputMaybe<Recipe_Direction_Durations_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Direction_Durations_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Direction_Durations_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Direction_Durations_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Direction_Durations_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Direction_Durations_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Direction_Durations_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Direction_Durations_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Direction_Durations_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipe_Direction_Durations_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Direction_Durations_Avg_Fields = {
  __typename?: 'recipe_direction_durations_avg_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Avg_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_direction_durations". All fields are combined with a logical 'AND'. */
export type Recipe_Direction_Durations_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Direction_Durations_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Direction_Durations_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Direction_Durations_Bool_Exp>>;
  duration?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  recipe_id?: InputMaybe<Int_Comparison_Exp>;
  seq_num?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  unit_of_time?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_direction_durations" */
export enum Recipe_Direction_Durations_Constraint {
  /** unique or primary key constraint */
  RecipeDirectionDurationsPkey = 'recipe_direction_durations_pkey'
}

/** input type for incrementing numeric columns in table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Inc_Input = {
  duration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Insert_Input = {
  duration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
  unit_of_time?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Recipe_Direction_Durations_Max_Fields = {
  __typename?: 'recipe_direction_durations_max_fields';
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  unit_of_time?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Max_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  unit_of_time?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Direction_Durations_Min_Fields = {
  __typename?: 'recipe_direction_durations_min_fields';
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  unit_of_time?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Min_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  unit_of_time?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Mutation_Response = {
  __typename?: 'recipe_direction_durations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Direction_Durations>;
};

/** on conflict condition type for table "recipe_direction_durations" */
export type Recipe_Direction_Durations_On_Conflict = {
  constraint: Recipe_Direction_Durations_Constraint;
  update_columns?: Array<Recipe_Direction_Durations_Update_Column>;
  where?: InputMaybe<Recipe_Direction_Durations_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_direction_durations". */
export type Recipe_Direction_Durations_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  unit_of_time?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_direction_durations */
export type Recipe_Direction_Durations_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "recipe_direction_durations" */
export enum Recipe_Direction_Durations_Select_Column {
  /** column name */
  Duration = 'duration',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  SeqNum = 'seq_num',
  /** column name */
  Type = 'type',
  /** column name */
  UnitOfTime = 'unit_of_time'
}

/** input type for updating data in table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Set_Input = {
  duration?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
  unit_of_time?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Recipe_Direction_Durations_Stddev_Fields = {
  __typename?: 'recipe_direction_durations_stddev_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Stddev_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Direction_Durations_Stddev_Pop_Fields = {
  __typename?: 'recipe_direction_durations_stddev_pop_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Stddev_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Direction_Durations_Stddev_Samp_Fields = {
  __typename?: 'recipe_direction_durations_stddev_samp_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Stddev_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipe_Direction_Durations_Sum_Fields = {
  __typename?: 'recipe_direction_durations_sum_fields';
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Sum_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_direction_durations" */
export enum Recipe_Direction_Durations_Update_Column {
  /** column name */
  Duration = 'duration',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  SeqNum = 'seq_num',
  /** column name */
  Type = 'type',
  /** column name */
  UnitOfTime = 'unit_of_time'
}

/** aggregate var_pop on columns */
export type Recipe_Direction_Durations_Var_Pop_Fields = {
  __typename?: 'recipe_direction_durations_var_pop_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Var_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Direction_Durations_Var_Samp_Fields = {
  __typename?: 'recipe_direction_durations_var_samp_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Var_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Direction_Durations_Variance_Fields = {
  __typename?: 'recipe_direction_durations_variance_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipe_direction_durations" */
export type Recipe_Direction_Durations_Variance_Order_By = {
  duration?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipe_directions" */
export type Recipe_Directions = {
  __typename?: 'recipe_directions';
  id: Scalars['Int'];
  /** An array relationship */
  recipe_direction_actions: Array<Recipe_Direction_Actions>;
  /** An aggregate relationship */
  recipe_direction_actions_aggregate: Recipe_Direction_Actions_Aggregate;
  recipe_id: Scalars['Int'];
  seq_num: Scalars['Int'];
  step: Scalars['String'];
  video_timestamp?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "recipe_directions" */
export type Recipe_DirectionsRecipe_Direction_ActionsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Actions_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Actions_Bool_Exp>;
};


/** columns and relationships of "recipe_directions" */
export type Recipe_DirectionsRecipe_Direction_Actions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Actions_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Actions_Bool_Exp>;
};

/** aggregated selection of "recipe_directions" */
export type Recipe_Directions_Aggregate = {
  __typename?: 'recipe_directions_aggregate';
  aggregate?: Maybe<Recipe_Directions_Aggregate_Fields>;
  nodes: Array<Recipe_Directions>;
};

/** aggregate fields of "recipe_directions" */
export type Recipe_Directions_Aggregate_Fields = {
  __typename?: 'recipe_directions_aggregate_fields';
  avg?: Maybe<Recipe_Directions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Directions_Max_Fields>;
  min?: Maybe<Recipe_Directions_Min_Fields>;
  stddev?: Maybe<Recipe_Directions_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Directions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Directions_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Directions_Sum_Fields>;
  var_pop?: Maybe<Recipe_Directions_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Directions_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Directions_Variance_Fields>;
};


/** aggregate fields of "recipe_directions" */
export type Recipe_Directions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Directions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipe_directions" */
export type Recipe_Directions_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Directions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Directions_Max_Order_By>;
  min?: InputMaybe<Recipe_Directions_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Directions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Directions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Directions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Directions_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Directions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Directions_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Directions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_directions" */
export type Recipe_Directions_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Directions_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipe_Directions_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Directions_Avg_Fields = {
  __typename?: 'recipe_directions_avg_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipe_directions" */
export type Recipe_Directions_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_directions". All fields are combined with a logical 'AND'. */
export type Recipe_Directions_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Directions_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Directions_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Directions_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  recipe_direction_actions?: InputMaybe<Recipe_Direction_Actions_Bool_Exp>;
  recipe_id?: InputMaybe<Int_Comparison_Exp>;
  seq_num?: InputMaybe<Int_Comparison_Exp>;
  step?: InputMaybe<String_Comparison_Exp>;
  video_timestamp?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_directions" */
export enum Recipe_Directions_Constraint {
  /** unique or primary key constraint */
  RecipeDirectionsPkey = 'recipe_directions_pkey',
  /** unique or primary key constraint */
  RecipeDirectionsRecipeIdSeqNumKey = 'recipe_directions_recipe_id_seq_num_key'
}

/** input type for incrementing numeric columns in table "recipe_directions" */
export type Recipe_Directions_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
  video_timestamp?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipe_directions" */
export type Recipe_Directions_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  recipe_direction_actions?: InputMaybe<Recipe_Direction_Actions_Arr_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
  step?: InputMaybe<Scalars['String']>;
  video_timestamp?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Recipe_Directions_Max_Fields = {
  __typename?: 'recipe_directions_max_fields';
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
  step?: Maybe<Scalars['String']>;
  video_timestamp?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "recipe_directions" */
export type Recipe_Directions_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  step?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Directions_Min_Fields = {
  __typename?: 'recipe_directions_min_fields';
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
  step?: Maybe<Scalars['String']>;
  video_timestamp?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "recipe_directions" */
export type Recipe_Directions_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  step?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_directions" */
export type Recipe_Directions_Mutation_Response = {
  __typename?: 'recipe_directions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Directions>;
};

/** on conflict condition type for table "recipe_directions" */
export type Recipe_Directions_On_Conflict = {
  constraint: Recipe_Directions_Constraint;
  update_columns?: Array<Recipe_Directions_Update_Column>;
  where?: InputMaybe<Recipe_Directions_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_directions". */
export type Recipe_Directions_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_direction_actions_aggregate?: InputMaybe<Recipe_Direction_Actions_Aggregate_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  step?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_directions */
export type Recipe_Directions_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "recipe_directions" */
export enum Recipe_Directions_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  SeqNum = 'seq_num',
  /** column name */
  Step = 'step',
  /** column name */
  VideoTimestamp = 'video_timestamp'
}

/** input type for updating data in table "recipe_directions" */
export type Recipe_Directions_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
  step?: InputMaybe<Scalars['String']>;
  video_timestamp?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Recipe_Directions_Stddev_Fields = {
  __typename?: 'recipe_directions_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipe_directions" */
export type Recipe_Directions_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Directions_Stddev_Pop_Fields = {
  __typename?: 'recipe_directions_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipe_directions" */
export type Recipe_Directions_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Directions_Stddev_Samp_Fields = {
  __typename?: 'recipe_directions_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipe_directions" */
export type Recipe_Directions_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipe_Directions_Sum_Fields = {
  __typename?: 'recipe_directions_sum_fields';
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
  video_timestamp?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "recipe_directions" */
export type Recipe_Directions_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_directions" */
export enum Recipe_Directions_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  SeqNum = 'seq_num',
  /** column name */
  Step = 'step',
  /** column name */
  VideoTimestamp = 'video_timestamp'
}

/** aggregate var_pop on columns */
export type Recipe_Directions_Var_Pop_Fields = {
  __typename?: 'recipe_directions_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipe_directions" */
export type Recipe_Directions_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Directions_Var_Samp_Fields = {
  __typename?: 'recipe_directions_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipe_directions" */
export type Recipe_Directions_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Directions_Variance_Fields = {
  __typename?: 'recipe_directions_variance_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipe_directions" */
export type Recipe_Directions_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipe_favorite" */
export type Recipe_Favorite = {
  __typename?: 'recipe_favorite';
  id: Scalars['bigint'];
  /** An object relationship */
  recipe: Recipes;
  recipe_id: Scalars['Int'];
  user_id: Scalars['Int'];
};

/** aggregated selection of "recipe_favorite" */
export type Recipe_Favorite_Aggregate = {
  __typename?: 'recipe_favorite_aggregate';
  aggregate?: Maybe<Recipe_Favorite_Aggregate_Fields>;
  nodes: Array<Recipe_Favorite>;
};

/** aggregate fields of "recipe_favorite" */
export type Recipe_Favorite_Aggregate_Fields = {
  __typename?: 'recipe_favorite_aggregate_fields';
  avg?: Maybe<Recipe_Favorite_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Favorite_Max_Fields>;
  min?: Maybe<Recipe_Favorite_Min_Fields>;
  stddev?: Maybe<Recipe_Favorite_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Favorite_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Favorite_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Favorite_Sum_Fields>;
  var_pop?: Maybe<Recipe_Favorite_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Favorite_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Favorite_Variance_Fields>;
};


/** aggregate fields of "recipe_favorite" */
export type Recipe_Favorite_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Favorite_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Recipe_Favorite_Avg_Fields = {
  __typename?: 'recipe_favorite_avg_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "recipe_favorite". All fields are combined with a logical 'AND'. */
export type Recipe_Favorite_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Favorite_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Favorite_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Favorite_Bool_Exp>>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<Int_Comparison_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_favorite" */
export enum Recipe_Favorite_Constraint {
  /** unique or primary key constraint */
  RecipeFavoritePkey = 'recipe_favorite_pkey'
}

/** input type for incrementing numeric columns in table "recipe_favorite" */
export type Recipe_Favorite_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipe_favorite" */
export type Recipe_Favorite_Insert_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Recipe_Favorite_Max_Fields = {
  __typename?: 'recipe_favorite_max_fields';
  id?: Maybe<Scalars['bigint']>;
  recipe_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Recipe_Favorite_Min_Fields = {
  __typename?: 'recipe_favorite_min_fields';
  id?: Maybe<Scalars['bigint']>;
  recipe_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "recipe_favorite" */
export type Recipe_Favorite_Mutation_Response = {
  __typename?: 'recipe_favorite_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Favorite>;
};

/** on conflict condition type for table "recipe_favorite" */
export type Recipe_Favorite_On_Conflict = {
  constraint: Recipe_Favorite_Constraint;
  update_columns?: Array<Recipe_Favorite_Update_Column>;
  where?: InputMaybe<Recipe_Favorite_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_favorite". */
export type Recipe_Favorite_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_favorite */
export type Recipe_Favorite_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "recipe_favorite" */
export enum Recipe_Favorite_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipe_favorite" */
export type Recipe_Favorite_Set_Input = {
  id?: InputMaybe<Scalars['bigint']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Recipe_Favorite_Stddev_Fields = {
  __typename?: 'recipe_favorite_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Favorite_Stddev_Pop_Fields = {
  __typename?: 'recipe_favorite_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Favorite_Stddev_Samp_Fields = {
  __typename?: 'recipe_favorite_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Recipe_Favorite_Sum_Fields = {
  __typename?: 'recipe_favorite_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  recipe_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "recipe_favorite" */
export enum Recipe_Favorite_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Recipe_Favorite_Var_Pop_Fields = {
  __typename?: 'recipe_favorite_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Recipe_Favorite_Var_Samp_Fields = {
  __typename?: 'recipe_favorite_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Recipe_Favorite_Variance_Fields = {
  __typename?: 'recipe_favorite_variance_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate = {
  __typename?: 'recipe_ingredient_food_candidate';
  /** An object relationship */
  food: Food;
  food_candidate_id: Scalars['Int'];
  food_candidate_portion_id: Scalars['Int'];
  /** An object relationship */
  food_portion?: Maybe<Food_Portion>;
  id: Scalars['Int'];
  recipe_ingredient_id: Scalars['Int'];
};

/** aggregated selection of "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Aggregate = {
  __typename?: 'recipe_ingredient_food_candidate_aggregate';
  aggregate?: Maybe<Recipe_Ingredient_Food_Candidate_Aggregate_Fields>;
  nodes: Array<Recipe_Ingredient_Food_Candidate>;
};

/** aggregate fields of "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Aggregate_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_aggregate_fields';
  avg?: Maybe<Recipe_Ingredient_Food_Candidate_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Ingredient_Food_Candidate_Max_Fields>;
  min?: Maybe<Recipe_Ingredient_Food_Candidate_Min_Fields>;
  stddev?: Maybe<Recipe_Ingredient_Food_Candidate_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Ingredient_Food_Candidate_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Ingredient_Food_Candidate_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Ingredient_Food_Candidate_Sum_Fields>;
  var_pop?: Maybe<Recipe_Ingredient_Food_Candidate_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Ingredient_Food_Candidate_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Ingredient_Food_Candidate_Variance_Fields>;
};


/** aggregate fields of "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Ingredient_Food_Candidate_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Ingredient_Food_Candidate_Max_Order_By>;
  min?: InputMaybe<Recipe_Ingredient_Food_Candidate_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Ingredient_Food_Candidate_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Ingredient_Food_Candidate_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Ingredient_Food_Candidate_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Ingredient_Food_Candidate_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Ingredient_Food_Candidate_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Ingredient_Food_Candidate_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Ingredient_Food_Candidate_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Ingredient_Food_Candidate_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipe_Ingredient_Food_Candidate_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Ingredient_Food_Candidate_Avg_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_avg_fields';
  food_candidate_id?: Maybe<Scalars['Float']>;
  food_candidate_portion_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_ingredient_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Avg_Order_By = {
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_ingredient_food_candidate". All fields are combined with a logical 'AND'. */
export type Recipe_Ingredient_Food_Candidate_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Ingredient_Food_Candidate_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Bool_Exp>>;
  food?: InputMaybe<Food_Bool_Exp>;
  food_candidate_id?: InputMaybe<Int_Comparison_Exp>;
  food_candidate_portion_id?: InputMaybe<Int_Comparison_Exp>;
  food_portion?: InputMaybe<Food_Portion_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  recipe_ingredient_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_ingredient_food_candidate" */
export enum Recipe_Ingredient_Food_Candidate_Constraint {
  /** unique or primary key constraint */
  RecipeIngredientFoodCandidatePkey = 'recipe_ingredient_food_candidate_pkey',
  /** unique or primary key constraint */
  RecipeIngredientFoodCandidateRecipeIngredientIdFoodCand = 'recipe_ingredient_food_candidate_recipe_ingredient_id_food_cand'
}

/** input type for incrementing numeric columns in table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Inc_Input = {
  food_candidate_id?: InputMaybe<Scalars['Int']>;
  food_candidate_portion_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  recipe_ingredient_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Insert_Input = {
  food?: InputMaybe<Food_Obj_Rel_Insert_Input>;
  food_candidate_id?: InputMaybe<Scalars['Int']>;
  food_candidate_portion_id?: InputMaybe<Scalars['Int']>;
  food_portion?: InputMaybe<Food_Portion_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']>;
  recipe_ingredient_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Recipe_Ingredient_Food_Candidate_Max_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_max_fields';
  food_candidate_id?: Maybe<Scalars['Int']>;
  food_candidate_portion_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  recipe_ingredient_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Max_Order_By = {
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Ingredient_Food_Candidate_Min_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_min_fields';
  food_candidate_id?: Maybe<Scalars['Int']>;
  food_candidate_portion_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  recipe_ingredient_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Min_Order_By = {
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Mutation_Response = {
  __typename?: 'recipe_ingredient_food_candidate_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Ingredient_Food_Candidate>;
};

/** on conflict condition type for table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_On_Conflict = {
  constraint: Recipe_Ingredient_Food_Candidate_Constraint;
  update_columns?: Array<Recipe_Ingredient_Food_Candidate_Update_Column>;
  where?: InputMaybe<Recipe_Ingredient_Food_Candidate_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_ingredient_food_candidate". */
export type Recipe_Ingredient_Food_Candidate_Order_By = {
  food?: InputMaybe<Food_Order_By>;
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  food_portion?: InputMaybe<Food_Portion_Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_ingredient_food_candidate */
export type Recipe_Ingredient_Food_Candidate_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "recipe_ingredient_food_candidate" */
export enum Recipe_Ingredient_Food_Candidate_Select_Column {
  /** column name */
  FoodCandidateId = 'food_candidate_id',
  /** column name */
  FoodCandidatePortionId = 'food_candidate_portion_id',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeIngredientId = 'recipe_ingredient_id'
}

/** input type for updating data in table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Set_Input = {
  food_candidate_id?: InputMaybe<Scalars['Int']>;
  food_candidate_portion_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  recipe_ingredient_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Recipe_Ingredient_Food_Candidate_Stddev_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_stddev_fields';
  food_candidate_id?: Maybe<Scalars['Float']>;
  food_candidate_portion_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_ingredient_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Stddev_Order_By = {
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Ingredient_Food_Candidate_Stddev_Pop_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_stddev_pop_fields';
  food_candidate_id?: Maybe<Scalars['Float']>;
  food_candidate_portion_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_ingredient_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Stddev_Pop_Order_By = {
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Ingredient_Food_Candidate_Stddev_Samp_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_stddev_samp_fields';
  food_candidate_id?: Maybe<Scalars['Float']>;
  food_candidate_portion_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_ingredient_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Stddev_Samp_Order_By = {
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipe_Ingredient_Food_Candidate_Sum_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_sum_fields';
  food_candidate_id?: Maybe<Scalars['Int']>;
  food_candidate_portion_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  recipe_ingredient_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Sum_Order_By = {
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_ingredient_food_candidate" */
export enum Recipe_Ingredient_Food_Candidate_Update_Column {
  /** column name */
  FoodCandidateId = 'food_candidate_id',
  /** column name */
  FoodCandidatePortionId = 'food_candidate_portion_id',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeIngredientId = 'recipe_ingredient_id'
}

/** aggregate var_pop on columns */
export type Recipe_Ingredient_Food_Candidate_Var_Pop_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_var_pop_fields';
  food_candidate_id?: Maybe<Scalars['Float']>;
  food_candidate_portion_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_ingredient_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Var_Pop_Order_By = {
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Ingredient_Food_Candidate_Var_Samp_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_var_samp_fields';
  food_candidate_id?: Maybe<Scalars['Float']>;
  food_candidate_portion_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_ingredient_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Var_Samp_Order_By = {
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Ingredient_Food_Candidate_Variance_Fields = {
  __typename?: 'recipe_ingredient_food_candidate_variance_fields';
  food_candidate_id?: Maybe<Scalars['Float']>;
  food_candidate_portion_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  recipe_ingredient_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipe_ingredient_food_candidate" */
export type Recipe_Ingredient_Food_Candidate_Variance_Order_By = {
  food_candidate_id?: InputMaybe<Order_By>;
  food_candidate_portion_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_ingredient_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups = {
  __typename?: 'recipe_ingredient_groups';
  /** An array relationship */
  group_ingredients: Array<Recipe_Ingredients>;
  /** An aggregate relationship */
  group_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "recipe_ingredient_groups" */
export type Recipe_Ingredient_GroupsGroup_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


/** columns and relationships of "recipe_ingredient_groups" */
export type Recipe_Ingredient_GroupsGroup_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};

/** aggregated selection of "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Aggregate = {
  __typename?: 'recipe_ingredient_groups_aggregate';
  aggregate?: Maybe<Recipe_Ingredient_Groups_Aggregate_Fields>;
  nodes: Array<Recipe_Ingredient_Groups>;
};

/** aggregate fields of "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Aggregate_Fields = {
  __typename?: 'recipe_ingredient_groups_aggregate_fields';
  avg?: Maybe<Recipe_Ingredient_Groups_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Ingredient_Groups_Max_Fields>;
  min?: Maybe<Recipe_Ingredient_Groups_Min_Fields>;
  stddev?: Maybe<Recipe_Ingredient_Groups_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Ingredient_Groups_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Ingredient_Groups_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Ingredient_Groups_Sum_Fields>;
  var_pop?: Maybe<Recipe_Ingredient_Groups_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Ingredient_Groups_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Ingredient_Groups_Variance_Fields>;
};


/** aggregate fields of "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Ingredient_Groups_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Ingredient_Groups_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Ingredient_Groups_Max_Order_By>;
  min?: InputMaybe<Recipe_Ingredient_Groups_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Ingredient_Groups_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Ingredient_Groups_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Ingredient_Groups_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Ingredient_Groups_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Ingredient_Groups_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Ingredient_Groups_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Ingredient_Groups_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Ingredient_Groups_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipe_Ingredient_Groups_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Ingredient_Groups_Avg_Fields = {
  __typename?: 'recipe_ingredient_groups_avg_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_ingredient_groups". All fields are combined with a logical 'AND'. */
export type Recipe_Ingredient_Groups_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Ingredient_Groups_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Ingredient_Groups_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Ingredient_Groups_Bool_Exp>>;
  group_ingredients?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<Int_Comparison_Exp>;
  seq_num?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_ingredient_groups" */
export enum Recipe_Ingredient_Groups_Constraint {
  /** unique or primary key constraint */
  RecipeIngredientGroupsPkey = 'recipe_ingredient_groups_pkey',
  /** unique or primary key constraint */
  RecipeIngredientGroupsRecipeIdSeqNumKey = 'recipe_ingredient_groups_recipe_id_seq_num_key'
}

/** input type for incrementing numeric columns in table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Insert_Input = {
  group_ingredients?: InputMaybe<Recipe_Ingredients_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Recipe_Ingredient_Groups_Max_Fields = {
  __typename?: 'recipe_ingredient_groups_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Ingredient_Groups_Min_Fields = {
  __typename?: 'recipe_ingredient_groups_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Mutation_Response = {
  __typename?: 'recipe_ingredient_groups_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Ingredient_Groups>;
};

/** input type for inserting object relation for remote table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Obj_Rel_Insert_Input = {
  data: Recipe_Ingredient_Groups_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipe_Ingredient_Groups_On_Conflict>;
};

/** on conflict condition type for table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_On_Conflict = {
  constraint: Recipe_Ingredient_Groups_Constraint;
  update_columns?: Array<Recipe_Ingredient_Groups_Update_Column>;
  where?: InputMaybe<Recipe_Ingredient_Groups_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_ingredient_groups". */
export type Recipe_Ingredient_Groups_Order_By = {
  group_ingredients_aggregate?: InputMaybe<Recipe_Ingredients_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_ingredient_groups */
export type Recipe_Ingredient_Groups_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "recipe_ingredient_groups" */
export enum Recipe_Ingredient_Groups_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  SeqNum = 'seq_num'
}

/** input type for updating data in table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Recipe_Ingredient_Groups_Stddev_Fields = {
  __typename?: 'recipe_ingredient_groups_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Ingredient_Groups_Stddev_Pop_Fields = {
  __typename?: 'recipe_ingredient_groups_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Ingredient_Groups_Stddev_Samp_Fields = {
  __typename?: 'recipe_ingredient_groups_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipe_Ingredient_Groups_Sum_Fields = {
  __typename?: 'recipe_ingredient_groups_sum_fields';
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_ingredient_groups" */
export enum Recipe_Ingredient_Groups_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  SeqNum = 'seq_num'
}

/** aggregate var_pop on columns */
export type Recipe_Ingredient_Groups_Var_Pop_Fields = {
  __typename?: 'recipe_ingredient_groups_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Ingredient_Groups_Var_Samp_Fields = {
  __typename?: 'recipe_ingredient_groups_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Ingredient_Groups_Variance_Fields = {
  __typename?: 'recipe_ingredient_groups_variance_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipe_ingredient_groups" */
export type Recipe_Ingredient_Groups_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipe_ingredients" */
export type Recipe_Ingredients = {
  __typename?: 'recipe_ingredients';
  amount?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  /** An object relationship */
  food?: Maybe<Food>;
  /** A computed field, executes function "food_candidates_for_ingredient" */
  food_candidates?: Maybe<Array<Food>>;
  food_id?: Maybe<Scalars['Int']>;
  group_id?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  recipe_ingredient_food_candidates: Array<Recipe_Ingredient_Food_Candidate>;
  /** An aggregate relationship */
  recipe_ingredient_food_candidates_aggregate: Recipe_Ingredient_Food_Candidate_Aggregate;
  /** An object relationship */
  recipe_ingredient_group?: Maybe<Recipe_Ingredient_Groups>;
  seq_num?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  units?: Maybe<Scalars['String']>;
  video_timestamp?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "recipe_ingredients" */
export type Recipe_IngredientsFood_CandidatesArgs = {
  distinct_on?: InputMaybe<Array<Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Order_By>>;
  where?: InputMaybe<Food_Bool_Exp>;
};


/** columns and relationships of "recipe_ingredients" */
export type Recipe_IngredientsRecipe_Ingredient_Food_CandidatesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Food_Candidate_Bool_Exp>;
};


/** columns and relationships of "recipe_ingredients" */
export type Recipe_IngredientsRecipe_Ingredient_Food_Candidates_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Food_Candidate_Bool_Exp>;
};

/** aggregated selection of "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate = {
  __typename?: 'recipe_ingredients_aggregate';
  aggregate?: Maybe<Recipe_Ingredients_Aggregate_Fields>;
  nodes: Array<Recipe_Ingredients>;
};

/** aggregate fields of "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate_Fields = {
  __typename?: 'recipe_ingredients_aggregate_fields';
  avg?: Maybe<Recipe_Ingredients_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Ingredients_Max_Fields>;
  min?: Maybe<Recipe_Ingredients_Min_Fields>;
  stddev?: Maybe<Recipe_Ingredients_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Ingredients_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Ingredients_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Ingredients_Sum_Fields>;
  var_pop?: Maybe<Recipe_Ingredients_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Ingredients_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Ingredients_Variance_Fields>;
};


/** aggregate fields of "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Ingredients_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Ingredients_Max_Order_By>;
  min?: InputMaybe<Recipe_Ingredients_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Ingredients_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Ingredients_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Ingredients_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Ingredients_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Ingredients_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Ingredients_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Ingredients_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_ingredients" */
export type Recipe_Ingredients_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Ingredients_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipe_Ingredients_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Ingredients_Avg_Fields = {
  __typename?: 'recipe_ingredients_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  food_id?: Maybe<Scalars['Float']>;
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_ingredients". All fields are combined with a logical 'AND'. */
export type Recipe_Ingredients_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Ingredients_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Ingredients_Bool_Exp>>;
  amount?: InputMaybe<Float_Comparison_Exp>;
  comment?: InputMaybe<String_Comparison_Exp>;
  food?: InputMaybe<Food_Bool_Exp>;
  food_candidates?: InputMaybe<Food_Bool_Exp>;
  food_id?: InputMaybe<Int_Comparison_Exp>;
  group_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recipe_ingredient_food_candidates?: InputMaybe<Recipe_Ingredient_Food_Candidate_Bool_Exp>;
  recipe_ingredient_group?: InputMaybe<Recipe_Ingredient_Groups_Bool_Exp>;
  seq_num?: InputMaybe<Int_Comparison_Exp>;
  text?: InputMaybe<String_Comparison_Exp>;
  units?: InputMaybe<String_Comparison_Exp>;
  video_timestamp?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_ingredients" */
export enum Recipe_Ingredients_Constraint {
  /** unique or primary key constraint */
  RecipeIngredientsGroupIdSeqNumKey = 'recipe_ingredients_group_id_seq_num_key',
  /** unique or primary key constraint */
  RecipeIngredientsPkey = 'recipe_ingredients_pkey'
}

/** input type for incrementing numeric columns in table "recipe_ingredients" */
export type Recipe_Ingredients_Inc_Input = {
  amount?: InputMaybe<Scalars['Float']>;
  food_id?: InputMaybe<Scalars['Int']>;
  group_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
  video_timestamp?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipe_ingredients" */
export type Recipe_Ingredients_Insert_Input = {
  amount?: InputMaybe<Scalars['Float']>;
  comment?: InputMaybe<Scalars['String']>;
  food?: InputMaybe<Food_Obj_Rel_Insert_Input>;
  food_id?: InputMaybe<Scalars['Int']>;
  group_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  recipe_ingredient_food_candidates?: InputMaybe<Recipe_Ingredient_Food_Candidate_Arr_Rel_Insert_Input>;
  recipe_ingredient_group?: InputMaybe<Recipe_Ingredient_Groups_Obj_Rel_Insert_Input>;
  seq_num?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  units?: InputMaybe<Scalars['String']>;
  video_timestamp?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Recipe_Ingredients_Max_Fields = {
  __typename?: 'recipe_ingredients_max_fields';
  amount?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  food_id?: Maybe<Scalars['Int']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  seq_num?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  units?: Maybe<Scalars['String']>;
  video_timestamp?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  comment?: InputMaybe<Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Ingredients_Min_Fields = {
  __typename?: 'recipe_ingredients_min_fields';
  amount?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  food_id?: Maybe<Scalars['Int']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  seq_num?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  units?: Maybe<Scalars['String']>;
  video_timestamp?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  comment?: InputMaybe<Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_ingredients" */
export type Recipe_Ingredients_Mutation_Response = {
  __typename?: 'recipe_ingredients_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Ingredients>;
};

/** on conflict condition type for table "recipe_ingredients" */
export type Recipe_Ingredients_On_Conflict = {
  constraint: Recipe_Ingredients_Constraint;
  update_columns?: Array<Recipe_Ingredients_Update_Column>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_ingredients". */
export type Recipe_Ingredients_Order_By = {
  amount?: InputMaybe<Order_By>;
  comment?: InputMaybe<Order_By>;
  food?: InputMaybe<Food_Order_By>;
  food_candidates_aggregate?: InputMaybe<Food_Aggregate_Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_ingredient_food_candidates_aggregate?: InputMaybe<Recipe_Ingredient_Food_Candidate_Aggregate_Order_By>;
  recipe_ingredient_group?: InputMaybe<Recipe_Ingredient_Groups_Order_By>;
  seq_num?: InputMaybe<Order_By>;
  text?: InputMaybe<Order_By>;
  units?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_ingredients */
export type Recipe_Ingredients_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "recipe_ingredients" */
export enum Recipe_Ingredients_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Comment = 'comment',
  /** column name */
  FoodId = 'food_id',
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SeqNum = 'seq_num',
  /** column name */
  Text = 'text',
  /** column name */
  Units = 'units',
  /** column name */
  VideoTimestamp = 'video_timestamp'
}

/** input type for updating data in table "recipe_ingredients" */
export type Recipe_Ingredients_Set_Input = {
  amount?: InputMaybe<Scalars['Float']>;
  comment?: InputMaybe<Scalars['String']>;
  food_id?: InputMaybe<Scalars['Int']>;
  group_id?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  seq_num?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  units?: InputMaybe<Scalars['String']>;
  video_timestamp?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Recipe_Ingredients_Stddev_Fields = {
  __typename?: 'recipe_ingredients_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  food_id?: Maybe<Scalars['Float']>;
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Ingredients_Stddev_Pop_Fields = {
  __typename?: 'recipe_ingredients_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  food_id?: Maybe<Scalars['Float']>;
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Ingredients_Stddev_Samp_Fields = {
  __typename?: 'recipe_ingredients_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  food_id?: Maybe<Scalars['Float']>;
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipe_Ingredients_Sum_Fields = {
  __typename?: 'recipe_ingredients_sum_fields';
  amount?: Maybe<Scalars['Float']>;
  food_id?: Maybe<Scalars['Int']>;
  group_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
  video_timestamp?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_ingredients" */
export enum Recipe_Ingredients_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  Comment = 'comment',
  /** column name */
  FoodId = 'food_id',
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SeqNum = 'seq_num',
  /** column name */
  Text = 'text',
  /** column name */
  Units = 'units',
  /** column name */
  VideoTimestamp = 'video_timestamp'
}

/** aggregate var_pop on columns */
export type Recipe_Ingredients_Var_Pop_Fields = {
  __typename?: 'recipe_ingredients_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  food_id?: Maybe<Scalars['Float']>;
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Ingredients_Var_Samp_Fields = {
  __typename?: 'recipe_ingredients_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  food_id?: Maybe<Scalars['Float']>;
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Ingredients_Variance_Fields = {
  __typename?: 'recipe_ingredients_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  food_id?: Maybe<Scalars['Float']>;
  group_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
  video_timestamp?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  food_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
  video_timestamp?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipe_list_items" */
export type Recipe_List_Items = {
  __typename?: 'recipe_list_items';
  id: Scalars['Int'];
  /** An object relationship */
  recipe: Recipes;
  recipe_id: Scalars['Int'];
  /** An object relationship */
  recipe_list: Recipe_Lists;
  recipe_list_id: Scalars['Int'];
  seq_num?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "recipe_list_items" */
export type Recipe_List_Items_Aggregate = {
  __typename?: 'recipe_list_items_aggregate';
  aggregate?: Maybe<Recipe_List_Items_Aggregate_Fields>;
  nodes: Array<Recipe_List_Items>;
};

/** aggregate fields of "recipe_list_items" */
export type Recipe_List_Items_Aggregate_Fields = {
  __typename?: 'recipe_list_items_aggregate_fields';
  avg?: Maybe<Recipe_List_Items_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_List_Items_Max_Fields>;
  min?: Maybe<Recipe_List_Items_Min_Fields>;
  stddev?: Maybe<Recipe_List_Items_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_List_Items_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_List_Items_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_List_Items_Sum_Fields>;
  var_pop?: Maybe<Recipe_List_Items_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_List_Items_Var_Samp_Fields>;
  variance?: Maybe<Recipe_List_Items_Variance_Fields>;
};


/** aggregate fields of "recipe_list_items" */
export type Recipe_List_Items_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_List_Items_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipe_list_items" */
export type Recipe_List_Items_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_List_Items_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_List_Items_Max_Order_By>;
  min?: InputMaybe<Recipe_List_Items_Min_Order_By>;
  stddev?: InputMaybe<Recipe_List_Items_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_List_Items_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_List_Items_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_List_Items_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_List_Items_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_List_Items_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_List_Items_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_list_items" */
export type Recipe_List_Items_Arr_Rel_Insert_Input = {
  data: Array<Recipe_List_Items_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipe_List_Items_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_List_Items_Avg_Fields = {
  __typename?: 'recipe_list_items_avg_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  recipe_list_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipe_list_items" */
export type Recipe_List_Items_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_list_items". All fields are combined with a logical 'AND'. */
export type Recipe_List_Items_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_List_Items_Bool_Exp>>;
  _not?: InputMaybe<Recipe_List_Items_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_List_Items_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<Int_Comparison_Exp>;
  recipe_list?: InputMaybe<Recipe_Lists_Bool_Exp>;
  recipe_list_id?: InputMaybe<Int_Comparison_Exp>;
  seq_num?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_list_items" */
export enum Recipe_List_Items_Constraint {
  /** unique or primary key constraint */
  RecipeListItemsPkey = 'recipe_list_items_pkey'
}

/** input type for incrementing numeric columns in table "recipe_list_items" */
export type Recipe_List_Items_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  recipe_list_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipe_list_items" */
export type Recipe_List_Items_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  recipe_list?: InputMaybe<Recipe_Lists_Obj_Rel_Insert_Input>;
  recipe_list_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Recipe_List_Items_Max_Fields = {
  __typename?: 'recipe_list_items_max_fields';
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  recipe_list_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "recipe_list_items" */
export type Recipe_List_Items_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_List_Items_Min_Fields = {
  __typename?: 'recipe_list_items_min_fields';
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  recipe_list_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "recipe_list_items" */
export type Recipe_List_Items_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_list_items" */
export type Recipe_List_Items_Mutation_Response = {
  __typename?: 'recipe_list_items_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_List_Items>;
};

/** on conflict condition type for table "recipe_list_items" */
export type Recipe_List_Items_On_Conflict = {
  constraint: Recipe_List_Items_Constraint;
  update_columns?: Array<Recipe_List_Items_Update_Column>;
  where?: InputMaybe<Recipe_List_Items_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_list_items". */
export type Recipe_List_Items_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list?: InputMaybe<Recipe_Lists_Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_list_items */
export type Recipe_List_Items_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "recipe_list_items" */
export enum Recipe_List_Items_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  RecipeListId = 'recipe_list_id',
  /** column name */
  SeqNum = 'seq_num'
}

/** input type for updating data in table "recipe_list_items" */
export type Recipe_List_Items_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  recipe_list_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Recipe_List_Items_Stddev_Fields = {
  __typename?: 'recipe_list_items_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  recipe_list_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipe_list_items" */
export type Recipe_List_Items_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_List_Items_Stddev_Pop_Fields = {
  __typename?: 'recipe_list_items_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  recipe_list_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipe_list_items" */
export type Recipe_List_Items_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_List_Items_Stddev_Samp_Fields = {
  __typename?: 'recipe_list_items_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  recipe_list_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipe_list_items" */
export type Recipe_List_Items_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipe_List_Items_Sum_Fields = {
  __typename?: 'recipe_list_items_sum_fields';
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  recipe_list_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "recipe_list_items" */
export type Recipe_List_Items_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_list_items" */
export enum Recipe_List_Items_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  RecipeListId = 'recipe_list_id',
  /** column name */
  SeqNum = 'seq_num'
}

/** aggregate var_pop on columns */
export type Recipe_List_Items_Var_Pop_Fields = {
  __typename?: 'recipe_list_items_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  recipe_list_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipe_list_items" */
export type Recipe_List_Items_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_List_Items_Var_Samp_Fields = {
  __typename?: 'recipe_list_items_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  recipe_list_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipe_list_items" */
export type Recipe_List_Items_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_List_Items_Variance_Fields = {
  __typename?: 'recipe_list_items_variance_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  recipe_list_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipe_list_items" */
export type Recipe_List_Items_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  recipe_list_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipe_lists" */
export type Recipe_Lists = {
  __typename?: 'recipe_lists';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  recipe_list_items: Array<Recipe_List_Items>;
  /** An aggregate relationship */
  recipe_list_items_aggregate: Recipe_List_Items_Aggregate;
  user_id: Scalars['uuid'];
};


/** columns and relationships of "recipe_lists" */
export type Recipe_ListsRecipe_List_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_List_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_List_Items_Order_By>>;
  where?: InputMaybe<Recipe_List_Items_Bool_Exp>;
};


/** columns and relationships of "recipe_lists" */
export type Recipe_ListsRecipe_List_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_List_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_List_Items_Order_By>>;
  where?: InputMaybe<Recipe_List_Items_Bool_Exp>;
};

/** aggregated selection of "recipe_lists" */
export type Recipe_Lists_Aggregate = {
  __typename?: 'recipe_lists_aggregate';
  aggregate?: Maybe<Recipe_Lists_Aggregate_Fields>;
  nodes: Array<Recipe_Lists>;
};

/** aggregate fields of "recipe_lists" */
export type Recipe_Lists_Aggregate_Fields = {
  __typename?: 'recipe_lists_aggregate_fields';
  avg?: Maybe<Recipe_Lists_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Lists_Max_Fields>;
  min?: Maybe<Recipe_Lists_Min_Fields>;
  stddev?: Maybe<Recipe_Lists_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Lists_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Lists_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Lists_Sum_Fields>;
  var_pop?: Maybe<Recipe_Lists_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Lists_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Lists_Variance_Fields>;
};


/** aggregate fields of "recipe_lists" */
export type Recipe_Lists_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Lists_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Recipe_Lists_Avg_Fields = {
  __typename?: 'recipe_lists_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "recipe_lists". All fields are combined with a logical 'AND'. */
export type Recipe_Lists_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Lists_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Lists_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Lists_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recipe_list_items?: InputMaybe<Recipe_List_Items_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_lists" */
export enum Recipe_Lists_Constraint {
  /** unique or primary key constraint */
  RecipeListsPkey = 'recipe_lists_pkey'
}

/** input type for incrementing numeric columns in table "recipe_lists" */
export type Recipe_Lists_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipe_lists" */
export type Recipe_Lists_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  recipe_list_items?: InputMaybe<Recipe_List_Items_Arr_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Recipe_Lists_Max_Fields = {
  __typename?: 'recipe_lists_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Recipe_Lists_Min_Fields = {
  __typename?: 'recipe_lists_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "recipe_lists" */
export type Recipe_Lists_Mutation_Response = {
  __typename?: 'recipe_lists_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Lists>;
};

/** input type for inserting object relation for remote table "recipe_lists" */
export type Recipe_Lists_Obj_Rel_Insert_Input = {
  data: Recipe_Lists_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipe_Lists_On_Conflict>;
};

/** on conflict condition type for table "recipe_lists" */
export type Recipe_Lists_On_Conflict = {
  constraint: Recipe_Lists_Constraint;
  update_columns?: Array<Recipe_Lists_Update_Column>;
  where?: InputMaybe<Recipe_Lists_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_lists". */
export type Recipe_Lists_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_list_items_aggregate?: InputMaybe<Recipe_List_Items_Aggregate_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_lists */
export type Recipe_Lists_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "recipe_lists" */
export enum Recipe_Lists_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipe_lists" */
export type Recipe_Lists_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Recipe_Lists_Stddev_Fields = {
  __typename?: 'recipe_lists_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Lists_Stddev_Pop_Fields = {
  __typename?: 'recipe_lists_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Lists_Stddev_Samp_Fields = {
  __typename?: 'recipe_lists_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Recipe_Lists_Sum_Fields = {
  __typename?: 'recipe_lists_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "recipe_lists" */
export enum Recipe_Lists_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Recipe_Lists_Var_Pop_Fields = {
  __typename?: 'recipe_lists_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Recipe_Lists_Var_Samp_Fields = {
  __typename?: 'recipe_lists_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Recipe_Lists_Variance_Fields = {
  __typename?: 'recipe_lists_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "recipe_tags" */
export type Recipe_Tags = {
  __typename?: 'recipe_tags';
  id: Scalars['Int'];
  name: Scalars['String'];
  recipe_id: Scalars['Int'];
  seq_num?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "recipe_tags" */
export type Recipe_Tags_Aggregate = {
  __typename?: 'recipe_tags_aggregate';
  aggregate?: Maybe<Recipe_Tags_Aggregate_Fields>;
  nodes: Array<Recipe_Tags>;
};

/** aggregate fields of "recipe_tags" */
export type Recipe_Tags_Aggregate_Fields = {
  __typename?: 'recipe_tags_aggregate_fields';
  avg?: Maybe<Recipe_Tags_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipe_Tags_Max_Fields>;
  min?: Maybe<Recipe_Tags_Min_Fields>;
  stddev?: Maybe<Recipe_Tags_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Tags_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Tags_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Tags_Sum_Fields>;
  var_pop?: Maybe<Recipe_Tags_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Tags_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Tags_Variance_Fields>;
};


/** aggregate fields of "recipe_tags" */
export type Recipe_Tags_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Tags_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "recipe_tags" */
export type Recipe_Tags_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Tags_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Tags_Max_Order_By>;
  min?: InputMaybe<Recipe_Tags_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Tags_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Tags_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Tags_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Tags_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Tags_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Tags_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Tags_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_tags" */
export type Recipe_Tags_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Tags_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipe_Tags_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Tags_Avg_Fields = {
  __typename?: 'recipe_tags_avg_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "recipe_tags" */
export type Recipe_Tags_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_tags". All fields are combined with a logical 'AND'. */
export type Recipe_Tags_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Tags_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Tags_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Tags_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recipe_id?: InputMaybe<Int_Comparison_Exp>;
  seq_num?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_tags" */
export enum Recipe_Tags_Constraint {
  /** unique or primary key constraint */
  RecipeTagsPkey = 'recipe_tags_pkey',
  /** unique or primary key constraint */
  RecipeTagsRecipeIdNameKey = 'recipe_tags_recipe_id_name_key'
}

/** input type for incrementing numeric columns in table "recipe_tags" */
export type Recipe_Tags_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipe_tags" */
export type Recipe_Tags_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Recipe_Tags_Max_Fields = {
  __typename?: 'recipe_tags_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "recipe_tags" */
export type Recipe_Tags_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Tags_Min_Fields = {
  __typename?: 'recipe_tags_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "recipe_tags" */
export type Recipe_Tags_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_tags" */
export type Recipe_Tags_Mutation_Response = {
  __typename?: 'recipe_tags_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Tags>;
};

/** on conflict condition type for table "recipe_tags" */
export type Recipe_Tags_On_Conflict = {
  constraint: Recipe_Tags_Constraint;
  update_columns?: Array<Recipe_Tags_Update_Column>;
  where?: InputMaybe<Recipe_Tags_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_tags". */
export type Recipe_Tags_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_tags */
export type Recipe_Tags_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "recipe_tags" */
export enum Recipe_Tags_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  SeqNum = 'seq_num'
}

/** input type for updating data in table "recipe_tags" */
export type Recipe_Tags_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  recipe_id?: InputMaybe<Scalars['Int']>;
  seq_num?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Recipe_Tags_Stddev_Fields = {
  __typename?: 'recipe_tags_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "recipe_tags" */
export type Recipe_Tags_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Tags_Stddev_Pop_Fields = {
  __typename?: 'recipe_tags_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "recipe_tags" */
export type Recipe_Tags_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Tags_Stddev_Samp_Fields = {
  __typename?: 'recipe_tags_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "recipe_tags" */
export type Recipe_Tags_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Recipe_Tags_Sum_Fields = {
  __typename?: 'recipe_tags_sum_fields';
  id?: Maybe<Scalars['Int']>;
  recipe_id?: Maybe<Scalars['Int']>;
  seq_num?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "recipe_tags" */
export type Recipe_Tags_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_tags" */
export enum Recipe_Tags_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  SeqNum = 'seq_num'
}

/** aggregate var_pop on columns */
export type Recipe_Tags_Var_Pop_Fields = {
  __typename?: 'recipe_tags_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "recipe_tags" */
export type Recipe_Tags_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Tags_Var_Samp_Fields = {
  __typename?: 'recipe_tags_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "recipe_tags" */
export type Recipe_Tags_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Tags_Variance_Fields = {
  __typename?: 'recipe_tags_variance_fields';
  id?: Maybe<Scalars['Float']>;
  recipe_id?: Maybe<Scalars['Float']>;
  seq_num?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "recipe_tags" */
export type Recipe_Tags_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  seq_num?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipes" */
export type Recipes = {
  __typename?: 'recipes';
  created_at: Scalars['timestamptz'];
  extraction_metadata?: Maybe<Scalars['jsonb']>;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** An array relationship */
  recipe_direction_durations: Array<Recipe_Direction_Durations>;
  /** An aggregate relationship */
  recipe_direction_durations_aggregate: Recipe_Direction_Durations_Aggregate;
  /** An array relationship */
  recipe_directions: Array<Recipe_Directions>;
  /** An aggregate relationship */
  recipe_directions_aggregate: Recipe_Directions_Aggregate;
  /** An array relationship */
  recipe_ingredient_groups: Array<Recipe_Ingredient_Groups>;
  /** An aggregate relationship */
  recipe_ingredient_groups_aggregate: Recipe_Ingredient_Groups_Aggregate;
  /** fetch data from the table: "recipe_tags" */
  recipe_tags: Array<Recipe_Tags>;
  /** fetch aggregated fields from the table: "recipe_tags" */
  recipe_tags_aggregate: Recipe_Tags_Aggregate;
  source: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  video?: Maybe<Scalars['String']>;
  visible: Scalars['Boolean'];
};


/** columns and relationships of "recipes" */
export type RecipesExtraction_MetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Direction_DurationsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Durations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Durations_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Durations_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Direction_Durations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Durations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Durations_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Durations_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_DirectionsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Directions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Directions_Order_By>>;
  where?: InputMaybe<Recipe_Directions_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Directions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Directions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Directions_Order_By>>;
  where?: InputMaybe<Recipe_Directions_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Ingredient_GroupsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Groups_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Groups_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Groups_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Ingredient_Groups_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Groups_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Groups_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Groups_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_TagsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Tags_Order_By>>;
  where?: InputMaybe<Recipe_Tags_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Tags_Order_By>>;
  where?: InputMaybe<Recipe_Tags_Bool_Exp>;
};

/** aggregated selection of "recipes" */
export type Recipes_Aggregate = {
  __typename?: 'recipes_aggregate';
  aggregate?: Maybe<Recipes_Aggregate_Fields>;
  nodes: Array<Recipes>;
};

/** aggregate fields of "recipes" */
export type Recipes_Aggregate_Fields = {
  __typename?: 'recipes_aggregate_fields';
  avg?: Maybe<Recipes_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Recipes_Max_Fields>;
  min?: Maybe<Recipes_Min_Fields>;
  stddev?: Maybe<Recipes_Stddev_Fields>;
  stddev_pop?: Maybe<Recipes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipes_Stddev_Samp_Fields>;
  sum?: Maybe<Recipes_Sum_Fields>;
  var_pop?: Maybe<Recipes_Var_Pop_Fields>;
  var_samp?: Maybe<Recipes_Var_Samp_Fields>;
  variance?: Maybe<Recipes_Variance_Fields>;
};


/** aggregate fields of "recipes" */
export type Recipes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Recipes_Append_Input = {
  extraction_metadata?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Recipes_Avg_Fields = {
  __typename?: 'recipes_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "recipes". All fields are combined with a logical 'AND'. */
export type Recipes_Bool_Exp = {
  _and?: InputMaybe<Array<Recipes_Bool_Exp>>;
  _not?: InputMaybe<Recipes_Bool_Exp>;
  _or?: InputMaybe<Array<Recipes_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  extraction_metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recipe_direction_durations?: InputMaybe<Recipe_Direction_Durations_Bool_Exp>;
  recipe_directions?: InputMaybe<Recipe_Directions_Bool_Exp>;
  recipe_ingredient_groups?: InputMaybe<Recipe_Ingredient_Groups_Bool_Exp>;
  recipe_tags?: InputMaybe<Recipe_Tags_Bool_Exp>;
  source?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  video?: InputMaybe<String_Comparison_Exp>;
  visible?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipes" */
export enum Recipes_Constraint {
  /** unique or primary key constraint */
  RecipesPkey = 'recipes_pkey',
  /** unique or primary key constraint */
  RecipesSourceKey = 'recipes_source_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Recipes_Delete_At_Path_Input = {
  extraction_metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Recipes_Delete_Elem_Input = {
  extraction_metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Recipes_Delete_Key_Input = {
  extraction_metadata?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "recipes" */
export type Recipes_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "recipes" */
export type Recipes_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extraction_metadata?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  recipe_direction_durations?: InputMaybe<Recipe_Direction_Durations_Arr_Rel_Insert_Input>;
  recipe_directions?: InputMaybe<Recipe_Directions_Arr_Rel_Insert_Input>;
  recipe_ingredient_groups?: InputMaybe<Recipe_Ingredient_Groups_Arr_Rel_Insert_Input>;
  recipe_tags?: InputMaybe<Recipe_Tags_Arr_Rel_Insert_Input>;
  source?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  video?: InputMaybe<Scalars['String']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Recipes_Max_Fields = {
  __typename?: 'recipes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  video?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Recipes_Min_Fields = {
  __typename?: 'recipes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  video?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "recipes" */
export type Recipes_Mutation_Response = {
  __typename?: 'recipes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipes>;
};

/** input type for inserting object relation for remote table "recipes" */
export type Recipes_Obj_Rel_Insert_Input = {
  data: Recipes_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};

/** on conflict condition type for table "recipes" */
export type Recipes_On_Conflict = {
  constraint: Recipes_Constraint;
  update_columns?: Array<Recipes_Update_Column>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};

/** Ordering options when selecting data from "recipes". */
export type Recipes_Order_By = {
  created_at?: InputMaybe<Order_By>;
  extraction_metadata?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_direction_durations_aggregate?: InputMaybe<Recipe_Direction_Durations_Aggregate_Order_By>;
  recipe_directions_aggregate?: InputMaybe<Recipe_Directions_Aggregate_Order_By>;
  recipe_ingredient_groups_aggregate?: InputMaybe<Recipe_Ingredient_Groups_Aggregate_Order_By>;
  recipe_tags_aggregate?: InputMaybe<Recipe_Tags_Aggregate_Order_By>;
  source?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  video?: InputMaybe<Order_By>;
  visible?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipes */
export type Recipes_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Recipes_Prepend_Input = {
  extraction_metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "recipes" */
export enum Recipes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtractionMetadata = 'extraction_metadata',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Source = 'source',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Video = 'video',
  /** column name */
  Visible = 'visible'
}

/** input type for updating data in table "recipes" */
export type Recipes_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  extraction_metadata?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  video?: InputMaybe<Scalars['String']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate stddev on columns */
export type Recipes_Stddev_Fields = {
  __typename?: 'recipes_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Recipes_Stddev_Pop_Fields = {
  __typename?: 'recipes_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Recipes_Stddev_Samp_Fields = {
  __typename?: 'recipes_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Recipes_Sum_Fields = {
  __typename?: 'recipes_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "recipes" */
export enum Recipes_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExtractionMetadata = 'extraction_metadata',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Source = 'source',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Video = 'video',
  /** column name */
  Visible = 'visible'
}

/** aggregate var_pop on columns */
export type Recipes_Var_Pop_Fields = {
  __typename?: 'recipes_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Recipes_Var_Samp_Fields = {
  __typename?: 'recipes_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Recipes_Variance_Fields = {
  __typename?: 'recipes_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Search_Foods_Args = {
  search?: InputMaybe<Scalars['String']>;
};

export type Search_Recipes_Args = {
  search?: InputMaybe<Scalars['String']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "auth.providers" using primary key columns */
  authProvider?: Maybe<AuthProviders>;
  /** fetch data from the table: "auth.provider_requests" using primary key columns */
  authProviderRequest?: Maybe<AuthProviderRequests>;
  /** fetch data from the table: "auth.provider_requests" */
  authProviderRequests: Array<AuthProviderRequests>;
  /** fetch aggregated fields from the table: "auth.provider_requests" */
  authProviderRequestsAggregate: AuthProviderRequests_Aggregate;
  /** fetch data from the table: "auth.providers" */
  authProviders: Array<AuthProviders>;
  /** fetch aggregated fields from the table: "auth.providers" */
  authProvidersAggregate: AuthProviders_Aggregate;
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  authRefreshToken?: Maybe<AuthRefreshTokens>;
  /** fetch data from the table: "auth.refresh_tokens" */
  authRefreshTokens: Array<AuthRefreshTokens>;
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  authRefreshTokensAggregate: AuthRefreshTokens_Aggregate;
  /** fetch data from the table: "auth.roles" using primary key columns */
  authRole?: Maybe<AuthRoles>;
  /** fetch data from the table: "auth.roles" */
  authRoles: Array<AuthRoles>;
  /** fetch aggregated fields from the table: "auth.roles" */
  authRolesAggregate: AuthRoles_Aggregate;
  /** fetch data from the table: "auth.user_providers" using primary key columns */
  authUserProvider?: Maybe<AuthUserProviders>;
  /** fetch data from the table: "auth.user_providers" */
  authUserProviders: Array<AuthUserProviders>;
  /** fetch aggregated fields from the table: "auth.user_providers" */
  authUserProvidersAggregate: AuthUserProviders_Aggregate;
  /** fetch data from the table: "auth.user_roles" using primary key columns */
  authUserRole?: Maybe<AuthUserRoles>;
  /** fetch data from the table: "auth.user_roles" */
  authUserRoles: Array<AuthUserRoles>;
  /** fetch aggregated fields from the table: "auth.user_roles" */
  authUserRolesAggregate: AuthUserRoles_Aggregate;
  /** fetch data from the table: "food" */
  food: Array<Food>;
  /** fetch aggregated fields from the table: "food" */
  food_aggregate: Food_Aggregate;
  /** fetch data from the table: "food_attribute" */
  food_attribute: Array<Food_Attribute>;
  /** fetch aggregated fields from the table: "food_attribute" */
  food_attribute_aggregate: Food_Attribute_Aggregate;
  /** fetch data from the table: "food_attribute" using primary key columns */
  food_attribute_by_pk?: Maybe<Food_Attribute>;
  /** fetch data from the table: "food_attribute_type" */
  food_attribute_type: Array<Food_Attribute_Type>;
  /** fetch aggregated fields from the table: "food_attribute_type" */
  food_attribute_type_aggregate: Food_Attribute_Type_Aggregate;
  /** fetch data from the table: "food_attribute_type" using primary key columns */
  food_attribute_type_by_pk?: Maybe<Food_Attribute_Type>;
  /** fetch data from the table: "food" using primary key columns */
  food_by_pk?: Maybe<Food>;
  /** fetch data from the table: "food_category" */
  food_category: Array<Food_Category>;
  /** fetch aggregated fields from the table: "food_category" */
  food_category_aggregate: Food_Category_Aggregate;
  /** fetch data from the table: "food_category" using primary key columns */
  food_category_by_pk?: Maybe<Food_Category>;
  /** fetch data from the table: "food_nutrient" */
  food_nutrient: Array<Food_Nutrient>;
  /** fetch aggregated fields from the table: "food_nutrient" */
  food_nutrient_aggregate: Food_Nutrient_Aggregate;
  /** fetch data from the table: "food_nutrient" using primary key columns */
  food_nutrient_by_pk?: Maybe<Food_Nutrient>;
  /** fetch data from the table: "food_portion" */
  food_portion: Array<Food_Portion>;
  /** fetch aggregated fields from the table: "food_portion" */
  food_portion_aggregate: Food_Portion_Aggregate;
  /** fetch data from the table: "food_portion" using primary key columns */
  food_portion_by_pk?: Maybe<Food_Portion>;
  /** fetch data from the table: "measure_unit" */
  measure_unit: Array<Measure_Unit>;
  /** fetch aggregated fields from the table: "measure_unit" */
  measure_unit_aggregate: Measure_Unit_Aggregate;
  /** fetch data from the table: "measure_unit" using primary key columns */
  measure_unit_by_pk?: Maybe<Measure_Unit>;
  /** fetch data from the table: "nutrient" */
  nutrient: Array<Nutrient>;
  /** fetch aggregated fields from the table: "nutrient" */
  nutrient_aggregate: Nutrient_Aggregate;
  /** fetch data from the table: "nutrient" using primary key columns */
  nutrient_by_pk?: Maybe<Nutrient>;
  /** An array relationship */
  recipe_direction_actions: Array<Recipe_Direction_Actions>;
  /** An aggregate relationship */
  recipe_direction_actions_aggregate: Recipe_Direction_Actions_Aggregate;
  /** fetch data from the table: "recipe_direction_actions" using primary key columns */
  recipe_direction_actions_by_pk?: Maybe<Recipe_Direction_Actions>;
  /** An array relationship */
  recipe_direction_durations: Array<Recipe_Direction_Durations>;
  /** An aggregate relationship */
  recipe_direction_durations_aggregate: Recipe_Direction_Durations_Aggregate;
  /** fetch data from the table: "recipe_direction_durations" using primary key columns */
  recipe_direction_durations_by_pk?: Maybe<Recipe_Direction_Durations>;
  /** An array relationship */
  recipe_directions: Array<Recipe_Directions>;
  /** An aggregate relationship */
  recipe_directions_aggregate: Recipe_Directions_Aggregate;
  /** fetch data from the table: "recipe_directions" using primary key columns */
  recipe_directions_by_pk?: Maybe<Recipe_Directions>;
  /** fetch data from the table: "recipe_favorite" */
  recipe_favorite: Array<Recipe_Favorite>;
  /** fetch aggregated fields from the table: "recipe_favorite" */
  recipe_favorite_aggregate: Recipe_Favorite_Aggregate;
  /** fetch data from the table: "recipe_favorite" using primary key columns */
  recipe_favorite_by_pk?: Maybe<Recipe_Favorite>;
  /** fetch data from the table: "recipe_ingredient_food_candidate" */
  recipe_ingredient_food_candidate: Array<Recipe_Ingredient_Food_Candidate>;
  /** fetch aggregated fields from the table: "recipe_ingredient_food_candidate" */
  recipe_ingredient_food_candidate_aggregate: Recipe_Ingredient_Food_Candidate_Aggregate;
  /** fetch data from the table: "recipe_ingredient_food_candidate" using primary key columns */
  recipe_ingredient_food_candidate_by_pk?: Maybe<Recipe_Ingredient_Food_Candidate>;
  /** An array relationship */
  recipe_ingredient_groups: Array<Recipe_Ingredient_Groups>;
  /** An aggregate relationship */
  recipe_ingredient_groups_aggregate: Recipe_Ingredient_Groups_Aggregate;
  /** fetch data from the table: "recipe_ingredient_groups" using primary key columns */
  recipe_ingredient_groups_by_pk?: Maybe<Recipe_Ingredient_Groups>;
  /** fetch data from the table: "recipe_ingredients" */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** fetch aggregated fields from the table: "recipe_ingredients" */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  /** fetch data from the table: "recipe_ingredients" using primary key columns */
  recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** An array relationship */
  recipe_list_items: Array<Recipe_List_Items>;
  /** An aggregate relationship */
  recipe_list_items_aggregate: Recipe_List_Items_Aggregate;
  /** fetch data from the table: "recipe_list_items" using primary key columns */
  recipe_list_items_by_pk?: Maybe<Recipe_List_Items>;
  /** fetch data from the table: "recipe_lists" */
  recipe_lists: Array<Recipe_Lists>;
  /** fetch aggregated fields from the table: "recipe_lists" */
  recipe_lists_aggregate: Recipe_Lists_Aggregate;
  /** fetch data from the table: "recipe_lists" using primary key columns */
  recipe_lists_by_pk?: Maybe<Recipe_Lists>;
  /** fetch data from the table: "recipe_tags" */
  recipe_tags: Array<Recipe_Tags>;
  /** fetch aggregated fields from the table: "recipe_tags" */
  recipe_tags_aggregate: Recipe_Tags_Aggregate;
  /** fetch data from the table: "recipe_tags" using primary key columns */
  recipe_tags_by_pk?: Maybe<Recipe_Tags>;
  /** fetch data from the table: "recipes" */
  recipes: Array<Recipes>;
  /** fetch aggregated fields from the table: "recipes" */
  recipes_aggregate: Recipes_Aggregate;
  /** fetch data from the table: "recipes" using primary key columns */
  recipes_by_pk?: Maybe<Recipes>;
  /** execute function "search_foods" which returns "food" */
  search_foods: Array<Food>;
  /** execute function "search_foods" and query aggregates on result of table type "food" */
  search_foods_aggregate: Food_Aggregate;
  /** execute function "search_recipes" which returns "recipes" */
  search_recipes: Array<Recipes>;
  /** execute function "search_recipes" and query aggregates on result of table type "recipes" */
  search_recipes_aggregate: Recipes_Aggregate;
  /** fetch data from the table: "auth.users" using primary key columns */
  user?: Maybe<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  userAggregate: Users_Aggregate;
  /** fetch data from the table: "user_config" */
  user_config: Array<User_Config>;
  /** fetch aggregated fields from the table: "user_config" */
  user_config_aggregate: User_Config_Aggregate;
  /** fetch data from the table: "user_config" using primary key columns */
  user_config_by_pk?: Maybe<User_Config>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
};


export type Subscription_RootAuthProviderArgs = {
  id: Scalars['String'];
};


export type Subscription_RootAuthProviderRequestArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthProviderRequestsArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Subscription_RootAuthProviderRequestsAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviderRequests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviderRequests_Order_By>>;
  where?: InputMaybe<AuthProviderRequests_Bool_Exp>;
};


export type Subscription_RootAuthProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Subscription_RootAuthProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthProviders_Order_By>>;
  where?: InputMaybe<AuthProviders_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokenArgs = {
  refreshToken: Scalars['uuid'];
};


export type Subscription_RootAuthRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Subscription_RootAuthRefreshTokensAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


export type Subscription_RootAuthRoleArgs = {
  role: Scalars['String'];
};


export type Subscription_RootAuthRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Subscription_RootAuthRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRoles_Order_By>>;
  where?: InputMaybe<AuthRoles_Bool_Exp>;
};


export type Subscription_RootAuthUserProviderArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Subscription_RootAuthUserProvidersAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


export type Subscription_RootAuthUserRoleArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthUserRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Subscription_RootAuthUserRolesAggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


export type Subscription_RootFoodArgs = {
  distinct_on?: InputMaybe<Array<Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Order_By>>;
  where?: InputMaybe<Food_Bool_Exp>;
};


export type Subscription_RootFood_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Order_By>>;
  where?: InputMaybe<Food_Bool_Exp>;
};


export type Subscription_RootFood_AttributeArgs = {
  distinct_on?: InputMaybe<Array<Food_Attribute_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Attribute_Order_By>>;
  where?: InputMaybe<Food_Attribute_Bool_Exp>;
};


export type Subscription_RootFood_Attribute_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Attribute_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Attribute_Order_By>>;
  where?: InputMaybe<Food_Attribute_Bool_Exp>;
};


export type Subscription_RootFood_Attribute_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootFood_Attribute_TypeArgs = {
  distinct_on?: InputMaybe<Array<Food_Attribute_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Attribute_Type_Order_By>>;
  where?: InputMaybe<Food_Attribute_Type_Bool_Exp>;
};


export type Subscription_RootFood_Attribute_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Attribute_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Attribute_Type_Order_By>>;
  where?: InputMaybe<Food_Attribute_Type_Bool_Exp>;
};


export type Subscription_RootFood_Attribute_Type_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootFood_By_PkArgs = {
  fdc_id: Scalars['Int'];
};


export type Subscription_RootFood_CategoryArgs = {
  distinct_on?: InputMaybe<Array<Food_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Category_Order_By>>;
  where?: InputMaybe<Food_Category_Bool_Exp>;
};


export type Subscription_RootFood_Category_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Category_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Category_Order_By>>;
  where?: InputMaybe<Food_Category_Bool_Exp>;
};


export type Subscription_RootFood_Category_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootFood_NutrientArgs = {
  distinct_on?: InputMaybe<Array<Food_Nutrient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Nutrient_Order_By>>;
  where?: InputMaybe<Food_Nutrient_Bool_Exp>;
};


export type Subscription_RootFood_Nutrient_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Nutrient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Nutrient_Order_By>>;
  where?: InputMaybe<Food_Nutrient_Bool_Exp>;
};


export type Subscription_RootFood_Nutrient_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootFood_PortionArgs = {
  distinct_on?: InputMaybe<Array<Food_Portion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Portion_Order_By>>;
  where?: InputMaybe<Food_Portion_Bool_Exp>;
};


export type Subscription_RootFood_Portion_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Food_Portion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Portion_Order_By>>;
  where?: InputMaybe<Food_Portion_Bool_Exp>;
};


export type Subscription_RootFood_Portion_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootMeasure_UnitArgs = {
  distinct_on?: InputMaybe<Array<Measure_Unit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Measure_Unit_Order_By>>;
  where?: InputMaybe<Measure_Unit_Bool_Exp>;
};


export type Subscription_RootMeasure_Unit_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Measure_Unit_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Measure_Unit_Order_By>>;
  where?: InputMaybe<Measure_Unit_Bool_Exp>;
};


export type Subscription_RootMeasure_Unit_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootNutrientArgs = {
  distinct_on?: InputMaybe<Array<Nutrient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Nutrient_Order_By>>;
  where?: InputMaybe<Nutrient_Bool_Exp>;
};


export type Subscription_RootNutrient_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Nutrient_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Nutrient_Order_By>>;
  where?: InputMaybe<Nutrient_Bool_Exp>;
};


export type Subscription_RootNutrient_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipe_Direction_ActionsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Actions_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Actions_Bool_Exp>;
};


export type Subscription_RootRecipe_Direction_Actions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Actions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Actions_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Actions_Bool_Exp>;
};


export type Subscription_RootRecipe_Direction_Actions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipe_Direction_DurationsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Durations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Durations_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Durations_Bool_Exp>;
};


export type Subscription_RootRecipe_Direction_Durations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Direction_Durations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Direction_Durations_Order_By>>;
  where?: InputMaybe<Recipe_Direction_Durations_Bool_Exp>;
};


export type Subscription_RootRecipe_Direction_Durations_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipe_DirectionsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Directions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Directions_Order_By>>;
  where?: InputMaybe<Recipe_Directions_Bool_Exp>;
};


export type Subscription_RootRecipe_Directions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Directions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Directions_Order_By>>;
  where?: InputMaybe<Recipe_Directions_Bool_Exp>;
};


export type Subscription_RootRecipe_Directions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipe_FavoriteArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Favorite_Order_By>>;
  where?: InputMaybe<Recipe_Favorite_Bool_Exp>;
};


export type Subscription_RootRecipe_Favorite_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Favorite_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Favorite_Order_By>>;
  where?: InputMaybe<Recipe_Favorite_Bool_Exp>;
};


export type Subscription_RootRecipe_Favorite_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootRecipe_Ingredient_Food_CandidateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Food_Candidate_Bool_Exp>;
};


export type Subscription_RootRecipe_Ingredient_Food_Candidate_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Food_Candidate_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Food_Candidate_Bool_Exp>;
};


export type Subscription_RootRecipe_Ingredient_Food_Candidate_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipe_Ingredient_GroupsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Groups_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Groups_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Groups_Bool_Exp>;
};


export type Subscription_RootRecipe_Ingredient_Groups_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredient_Groups_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredient_Groups_Order_By>>;
  where?: InputMaybe<Recipe_Ingredient_Groups_Bool_Exp>;
};


export type Subscription_RootRecipe_Ingredient_Groups_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Subscription_RootRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Subscription_RootRecipe_Ingredients_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipe_List_ItemsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_List_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_List_Items_Order_By>>;
  where?: InputMaybe<Recipe_List_Items_Bool_Exp>;
};


export type Subscription_RootRecipe_List_Items_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_List_Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_List_Items_Order_By>>;
  where?: InputMaybe<Recipe_List_Items_Bool_Exp>;
};


export type Subscription_RootRecipe_List_Items_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipe_ListsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Lists_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Lists_Order_By>>;
  where?: InputMaybe<Recipe_Lists_Bool_Exp>;
};


export type Subscription_RootRecipe_Lists_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Lists_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Lists_Order_By>>;
  where?: InputMaybe<Recipe_Lists_Bool_Exp>;
};


export type Subscription_RootRecipe_Lists_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipe_TagsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Tags_Order_By>>;
  where?: InputMaybe<Recipe_Tags_Bool_Exp>;
};


export type Subscription_RootRecipe_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipe_Tags_Order_By>>;
  where?: InputMaybe<Recipe_Tags_Bool_Exp>;
};


export type Subscription_RootRecipe_Tags_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootRecipesArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootRecipes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootRecipes_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootSearch_FoodsArgs = {
  args: Search_Foods_Args;
  distinct_on?: InputMaybe<Array<Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Order_By>>;
  where?: InputMaybe<Food_Bool_Exp>;
};


export type Subscription_RootSearch_Foods_AggregateArgs = {
  args: Search_Foods_Args;
  distinct_on?: InputMaybe<Array<Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Food_Order_By>>;
  where?: InputMaybe<Food_Bool_Exp>;
};


export type Subscription_RootSearch_RecipesArgs = {
  args: Search_Recipes_Args;
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootSearch_Recipes_AggregateArgs = {
  args: Search_Recipes_Args;
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUserAggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUser_ConfigArgs = {
  distinct_on?: InputMaybe<Array<User_Config_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Config_Order_By>>;
  where?: InputMaybe<User_Config_Bool_Exp>;
};


export type Subscription_RootUser_Config_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Config_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Config_Order_By>>;
  where?: InputMaybe<User_Config_Bool_Exp>;
};


export type Subscription_RootUser_Config_By_PkArgs = {
  user_id: Scalars['Int'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "tsvector". All fields are combined with logical 'AND'. */
export type Tsvector_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['tsvector']>;
  _gt?: InputMaybe<Scalars['tsvector']>;
  _gte?: InputMaybe<Scalars['tsvector']>;
  _in?: InputMaybe<Array<Scalars['tsvector']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['tsvector']>;
  _lte?: InputMaybe<Scalars['tsvector']>;
  _neq?: InputMaybe<Scalars['tsvector']>;
  _nin?: InputMaybe<Array<Scalars['tsvector']>>;
};

/** columns and relationships of "user_config" */
export type User_Config = {
  __typename?: 'user_config';
  printer_url?: Maybe<Scalars['String']>;
  user_id: Scalars['Int'];
};

/** aggregated selection of "user_config" */
export type User_Config_Aggregate = {
  __typename?: 'user_config_aggregate';
  aggregate?: Maybe<User_Config_Aggregate_Fields>;
  nodes: Array<User_Config>;
};

/** aggregate fields of "user_config" */
export type User_Config_Aggregate_Fields = {
  __typename?: 'user_config_aggregate_fields';
  avg?: Maybe<User_Config_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Config_Max_Fields>;
  min?: Maybe<User_Config_Min_Fields>;
  stddev?: Maybe<User_Config_Stddev_Fields>;
  stddev_pop?: Maybe<User_Config_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Config_Stddev_Samp_Fields>;
  sum?: Maybe<User_Config_Sum_Fields>;
  var_pop?: Maybe<User_Config_Var_Pop_Fields>;
  var_samp?: Maybe<User_Config_Var_Samp_Fields>;
  variance?: Maybe<User_Config_Variance_Fields>;
};


/** aggregate fields of "user_config" */
export type User_Config_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Config_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Config_Avg_Fields = {
  __typename?: 'user_config_avg_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_config". All fields are combined with a logical 'AND'. */
export type User_Config_Bool_Exp = {
  _and?: InputMaybe<Array<User_Config_Bool_Exp>>;
  _not?: InputMaybe<User_Config_Bool_Exp>;
  _or?: InputMaybe<Array<User_Config_Bool_Exp>>;
  printer_url?: InputMaybe<String_Comparison_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_config" */
export enum User_Config_Constraint {
  /** unique or primary key constraint */
  UserConfigPkey = 'user_config_pkey'
}

/** input type for incrementing numeric columns in table "user_config" */
export type User_Config_Inc_Input = {
  user_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_config" */
export type User_Config_Insert_Input = {
  printer_url?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type User_Config_Max_Fields = {
  __typename?: 'user_config_max_fields';
  printer_url?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type User_Config_Min_Fields = {
  __typename?: 'user_config_min_fields';
  printer_url?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "user_config" */
export type User_Config_Mutation_Response = {
  __typename?: 'user_config_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Config>;
};

/** on conflict condition type for table "user_config" */
export type User_Config_On_Conflict = {
  constraint: User_Config_Constraint;
  update_columns?: Array<User_Config_Update_Column>;
  where?: InputMaybe<User_Config_Bool_Exp>;
};

/** Ordering options when selecting data from "user_config". */
export type User_Config_Order_By = {
  printer_url?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_config */
export type User_Config_Pk_Columns_Input = {
  user_id: Scalars['Int'];
};

/** select columns of table "user_config" */
export enum User_Config_Select_Column {
  /** column name */
  PrinterUrl = 'printer_url',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_config" */
export type User_Config_Set_Input = {
  printer_url?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type User_Config_Stddev_Fields = {
  __typename?: 'user_config_stddev_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Config_Stddev_Pop_Fields = {
  __typename?: 'user_config_stddev_pop_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Config_Stddev_Samp_Fields = {
  __typename?: 'user_config_stddev_samp_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type User_Config_Sum_Fields = {
  __typename?: 'user_config_sum_fields';
  user_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "user_config" */
export enum User_Config_Update_Column {
  /** column name */
  PrinterUrl = 'printer_url',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type User_Config_Var_Pop_Fields = {
  __typename?: 'user_config_var_pop_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Config_Var_Samp_Fields = {
  __typename?: 'user_config_var_samp_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Config_Variance_Fields = {
  __typename?: 'user_config_variance_fields';
  user_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "auth.users" */
export type Users = {
  __typename?: 'users';
  activeMfaType?: Maybe<Scalars['String']>;
  avatarUrl: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  defaultRole: Scalars['String'];
  /** An object relationship */
  defaultRoleByRole: AuthRoles;
  disabled: Scalars['Boolean'];
  displayName: Scalars['String'];
  email?: Maybe<Scalars['citext']>;
  emailVerified: Scalars['Boolean'];
  id: Scalars['uuid'];
  isAnonymous: Scalars['Boolean'];
  lastSeen?: Maybe<Scalars['timestamptz']>;
  locale: Scalars['String'];
  metadata?: Maybe<Scalars['jsonb']>;
  newEmail?: Maybe<Scalars['citext']>;
  otpHash?: Maybe<Scalars['String']>;
  otpHashExpiresAt: Scalars['timestamptz'];
  otpMethodLastUsed?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberVerified: Scalars['Boolean'];
  /** An array relationship */
  refreshTokens: Array<AuthRefreshTokens>;
  /** An aggregate relationship */
  refreshTokens_aggregate: AuthRefreshTokens_Aggregate;
  /** An array relationship */
  roles: Array<AuthUserRoles>;
  /** An aggregate relationship */
  roles_aggregate: AuthUserRoles_Aggregate;
  ticket?: Maybe<Scalars['String']>;
  ticketExpiresAt: Scalars['timestamptz'];
  totpSecret?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  /** An array relationship */
  userProviders: Array<AuthUserProviders>;
  /** An aggregate relationship */
  userProviders_aggregate: AuthUserProviders_Aggregate;
};


/** columns and relationships of "auth.users" */
export type UsersMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "auth.users" */
export type UsersRefreshTokensArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


/** columns and relationships of "auth.users" */
export type UsersRefreshTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthRefreshTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthRefreshTokens_Order_By>>;
  where?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
};


/** columns and relationships of "auth.users" */
export type UsersRolesArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** columns and relationships of "auth.users" */
export type UsersRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserRoles_Order_By>>;
  where?: InputMaybe<AuthUserRoles_Bool_Exp>;
};


/** columns and relationships of "auth.users" */
export type UsersUserProvidersArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};


/** columns and relationships of "auth.users" */
export type UsersUserProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AuthUserProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AuthUserProviders_Order_By>>;
  where?: InputMaybe<AuthUserProviders_Bool_Exp>;
};

/** aggregated selection of "auth.users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "auth.users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "auth.users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.users" */
export type Users_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Users_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "auth.users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "auth.users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  activeMfaType?: InputMaybe<String_Comparison_Exp>;
  avatarUrl?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  defaultRole?: InputMaybe<String_Comparison_Exp>;
  defaultRoleByRole?: InputMaybe<AuthRoles_Bool_Exp>;
  disabled?: InputMaybe<Boolean_Comparison_Exp>;
  displayName?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<Citext_Comparison_Exp>;
  emailVerified?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isAnonymous?: InputMaybe<Boolean_Comparison_Exp>;
  lastSeen?: InputMaybe<Timestamptz_Comparison_Exp>;
  locale?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  newEmail?: InputMaybe<Citext_Comparison_Exp>;
  otpHash?: InputMaybe<String_Comparison_Exp>;
  otpHashExpiresAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  otpMethodLastUsed?: InputMaybe<String_Comparison_Exp>;
  passwordHash?: InputMaybe<String_Comparison_Exp>;
  phoneNumber?: InputMaybe<String_Comparison_Exp>;
  phoneNumberVerified?: InputMaybe<Boolean_Comparison_Exp>;
  refreshTokens?: InputMaybe<AuthRefreshTokens_Bool_Exp>;
  roles?: InputMaybe<AuthUserRoles_Bool_Exp>;
  ticket?: InputMaybe<String_Comparison_Exp>;
  ticketExpiresAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  totpSecret?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  userProviders?: InputMaybe<AuthUserProviders_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint */
  UsersPhoneNumberKey = 'users_phone_number_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Users_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Users_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Users_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "auth.users" */
export type Users_Insert_Input = {
  activeMfaType?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  defaultRole?: InputMaybe<Scalars['String']>;
  defaultRoleByRole?: InputMaybe<AuthRoles_Obj_Rel_Insert_Input>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['citext']>;
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  lastSeen?: InputMaybe<Scalars['timestamptz']>;
  locale?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  newEmail?: InputMaybe<Scalars['citext']>;
  otpHash?: InputMaybe<Scalars['String']>;
  otpHashExpiresAt?: InputMaybe<Scalars['timestamptz']>;
  otpMethodLastUsed?: InputMaybe<Scalars['String']>;
  passwordHash?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  phoneNumberVerified?: InputMaybe<Scalars['Boolean']>;
  refreshTokens?: InputMaybe<AuthRefreshTokens_Arr_Rel_Insert_Input>;
  roles?: InputMaybe<AuthUserRoles_Arr_Rel_Insert_Input>;
  ticket?: InputMaybe<Scalars['String']>;
  ticketExpiresAt?: InputMaybe<Scalars['timestamptz']>;
  totpSecret?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userProviders?: InputMaybe<AuthUserProviders_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  activeMfaType?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultRole?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['citext']>;
  id?: Maybe<Scalars['uuid']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  locale?: Maybe<Scalars['String']>;
  newEmail?: Maybe<Scalars['citext']>;
  otpHash?: Maybe<Scalars['String']>;
  otpHashExpiresAt?: Maybe<Scalars['timestamptz']>;
  otpMethodLastUsed?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  ticket?: Maybe<Scalars['String']>;
  ticketExpiresAt?: Maybe<Scalars['timestamptz']>;
  totpSecret?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "auth.users" */
export type Users_Max_Order_By = {
  activeMfaType?: InputMaybe<Order_By>;
  avatarUrl?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  defaultRole?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastSeen?: InputMaybe<Order_By>;
  locale?: InputMaybe<Order_By>;
  newEmail?: InputMaybe<Order_By>;
  otpHash?: InputMaybe<Order_By>;
  otpHashExpiresAt?: InputMaybe<Order_By>;
  otpMethodLastUsed?: InputMaybe<Order_By>;
  passwordHash?: InputMaybe<Order_By>;
  phoneNumber?: InputMaybe<Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticketExpiresAt?: InputMaybe<Order_By>;
  totpSecret?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  activeMfaType?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  defaultRole?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['citext']>;
  id?: Maybe<Scalars['uuid']>;
  lastSeen?: Maybe<Scalars['timestamptz']>;
  locale?: Maybe<Scalars['String']>;
  newEmail?: Maybe<Scalars['citext']>;
  otpHash?: Maybe<Scalars['String']>;
  otpHashExpiresAt?: Maybe<Scalars['timestamptz']>;
  otpMethodLastUsed?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  ticket?: Maybe<Scalars['String']>;
  ticketExpiresAt?: Maybe<Scalars['timestamptz']>;
  totpSecret?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "auth.users" */
export type Users_Min_Order_By = {
  activeMfaType?: InputMaybe<Order_By>;
  avatarUrl?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  defaultRole?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastSeen?: InputMaybe<Order_By>;
  locale?: InputMaybe<Order_By>;
  newEmail?: InputMaybe<Order_By>;
  otpHash?: InputMaybe<Order_By>;
  otpHashExpiresAt?: InputMaybe<Order_By>;
  otpMethodLastUsed?: InputMaybe<Order_By>;
  passwordHash?: InputMaybe<Order_By>;
  phoneNumber?: InputMaybe<Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticketExpiresAt?: InputMaybe<Order_By>;
  totpSecret?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "auth.users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "auth.users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on conflict condition type for table "auth.users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "auth.users". */
export type Users_Order_By = {
  activeMfaType?: InputMaybe<Order_By>;
  avatarUrl?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  defaultRole?: InputMaybe<Order_By>;
  defaultRoleByRole?: InputMaybe<AuthRoles_Order_By>;
  disabled?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  emailVerified?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isAnonymous?: InputMaybe<Order_By>;
  lastSeen?: InputMaybe<Order_By>;
  locale?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  newEmail?: InputMaybe<Order_By>;
  otpHash?: InputMaybe<Order_By>;
  otpHashExpiresAt?: InputMaybe<Order_By>;
  otpMethodLastUsed?: InputMaybe<Order_By>;
  passwordHash?: InputMaybe<Order_By>;
  phoneNumber?: InputMaybe<Order_By>;
  phoneNumberVerified?: InputMaybe<Order_By>;
  refreshTokens_aggregate?: InputMaybe<AuthRefreshTokens_Aggregate_Order_By>;
  roles_aggregate?: InputMaybe<AuthUserRoles_Aggregate_Order_By>;
  ticket?: InputMaybe<Order_By>;
  ticketExpiresAt?: InputMaybe<Order_By>;
  totpSecret?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  userProviders_aggregate?: InputMaybe<AuthUserProviders_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Users_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "auth.users" */
export enum Users_Select_Column {
  /** column name */
  ActiveMfaType = 'activeMfaType',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DefaultRole = 'defaultRole',
  /** column name */
  Disabled = 'disabled',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  LastSeen = 'lastSeen',
  /** column name */
  Locale = 'locale',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewEmail = 'newEmail',
  /** column name */
  OtpHash = 'otpHash',
  /** column name */
  OtpHashExpiresAt = 'otpHashExpiresAt',
  /** column name */
  OtpMethodLastUsed = 'otpMethodLastUsed',
  /** column name */
  PasswordHash = 'passwordHash',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified',
  /** column name */
  Ticket = 'ticket',
  /** column name */
  TicketExpiresAt = 'ticketExpiresAt',
  /** column name */
  TotpSecret = 'totpSecret',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "auth.users" */
export type Users_Set_Input = {
  activeMfaType?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  defaultRole?: InputMaybe<Scalars['String']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['citext']>;
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  lastSeen?: InputMaybe<Scalars['timestamptz']>;
  locale?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  newEmail?: InputMaybe<Scalars['citext']>;
  otpHash?: InputMaybe<Scalars['String']>;
  otpHashExpiresAt?: InputMaybe<Scalars['timestamptz']>;
  otpMethodLastUsed?: InputMaybe<Scalars['String']>;
  passwordHash?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  phoneNumberVerified?: InputMaybe<Scalars['Boolean']>;
  ticket?: InputMaybe<Scalars['String']>;
  ticketExpiresAt?: InputMaybe<Scalars['timestamptz']>;
  totpSecret?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "auth.users" */
export enum Users_Update_Column {
  /** column name */
  ActiveMfaType = 'activeMfaType',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DefaultRole = 'defaultRole',
  /** column name */
  Disabled = 'disabled',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  LastSeen = 'lastSeen',
  /** column name */
  Locale = 'locale',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewEmail = 'newEmail',
  /** column name */
  OtpHash = 'otpHash',
  /** column name */
  OtpHashExpiresAt = 'otpHashExpiresAt',
  /** column name */
  OtpMethodLastUsed = 'otpMethodLastUsed',
  /** column name */
  PasswordHash = 'passwordHash',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified',
  /** column name */
  Ticket = 'ticket',
  /** column name */
  TicketExpiresAt = 'ticketExpiresAt',
  /** column name */
  TotpSecret = 'totpSecret',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type RecipeFoodCandidatesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RecipeFoodCandidatesQuery = { __typename?: 'query_root', recipe_ingredients_by_pk?: { __typename?: 'recipe_ingredients', name?: string | null, food_candidates?: Array<{ __typename?: 'food', fdc_id: number, description?: string | null, food_portions: Array<{ __typename?: 'food_portion', id: number, amount?: any | null, gram_weight?: any | null, modifier?: string | null, measure_unit_id?: number | null, measure_unit?: { __typename?: 'measure_unit', ml?: any | null, name?: string | null } | null }> }> | null } | null };

export type InsertFoodCandidateForIngredientMutationVariables = Exact<{
  object: Recipe_Ingredient_Food_Candidate_Insert_Input;
}>;


export type InsertFoodCandidateForIngredientMutation = { __typename?: 'mutation_root', insert_recipe_ingredient_food_candidate_one?: { __typename?: 'recipe_ingredient_food_candidate', id: number } | null };

export type RecipesQueryQueryVariables = Exact<{
  where: Recipes_Bool_Exp;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type RecipesQueryQuery = { __typename?: 'query_root', recipes: Array<{ __typename?: 'recipes', id: number, name: string, source: string, created_at: any }>, recipes_aggregate: { __typename?: 'recipes_aggregate', aggregate?: { __typename?: 'recipes_aggregate_fields', count: number } | null } };

export type InsertRecipeMutationVariables = Exact<{
  recipe: Recipes_Insert_Input;
}>;


export type InsertRecipeMutation = { __typename?: 'mutation_root', insert_recipes_one?: { __typename?: 'recipes', id: number } | null };

export type GetUserRecipeListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserRecipeListsQuery = { __typename?: 'query_root', recipe_lists: Array<{ __typename?: 'recipe_lists', id: number, name?: string | null, recipe_list_items: Array<{ __typename?: 'recipe_list_items', id: number, seq_num?: number | null, recipe: { __typename?: 'recipes', id: number, name: string } }> }> };

export type InsertRecipeListMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type InsertRecipeListMutation = { __typename?: 'mutation_root', insert_recipe_lists_one?: { __typename?: 'recipe_lists', id: number } | null };

export type DeleteRecipeListMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type DeleteRecipeListMutation = { __typename?: 'mutation_root', delete_recipe_lists?: { __typename?: 'recipe_lists_mutation_response', affected_rows: number } | null };

export type ViewRecipeQueryQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ViewRecipeQueryQuery = { __typename?: 'query_root', recipes_by_pk?: { __typename?: 'recipes', id: number, name: string, created_at: any, source: string, updated_at: any, video?: string | null, recipe_ingredient_groups: Array<{ __typename?: 'recipe_ingredient_groups', name?: string | null, group_ingredients: Array<{ __typename?: 'recipe_ingredients', id: number, seq_num?: number | null, text: string, name?: string | null, amount?: number | null, comment?: string | null, units?: string | null, video_timestamp?: number | null, recipe_ingredient_food_candidates: Array<{ __typename?: 'recipe_ingredient_food_candidate', food_portion?: { __typename?: 'food_portion', gram_weight?: any | null, amount?: any | null, modifier?: string | null, portion_description?: string | null, measure_unit?: { __typename?: 'measure_unit', name?: string | null } | null } | null, food: { __typename?: 'food', description?: string | null } }> }> }>, recipe_directions: Array<{ __typename?: 'recipe_directions', seq_num: number, step: string, video_timestamp?: number | null }>, recipe_tags: Array<{ __typename?: 'recipe_tags', name: string, id: number }> } | null };

export type GetRecipeListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipeListsQuery = { __typename?: 'query_root', recipe_lists: Array<{ __typename?: 'recipe_lists', id: number, name?: string | null }> };

export type InsertRecipeIntoListMutationVariables = Exact<{
  recipe_id?: InputMaybe<Scalars['Int']>;
  recipe_list_id?: InputMaybe<Scalars['Int']>;
}>;


export type InsertRecipeIntoListMutation = { __typename?: 'mutation_root', insert_recipe_list_items_one?: { __typename?: 'recipe_list_items', id: number } | null };

export type HideRecipeMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type HideRecipeMutation = { __typename?: 'mutation_root', update_recipes_by_pk?: { __typename?: 'recipes', id: number } | null };


export const RecipeFoodCandidatesDocument = gql`
    query RecipeFoodCandidates($id: Int!) {
  recipe_ingredients_by_pk(id: $id) {
    name
    food_candidates(limit: 10) {
      fdc_id
      description
      food_portions(distinct_on: [measure_unit_id, modifier, portion_description]) {
        id
        amount
        gram_weight
        modifier
        measure_unit {
          ml
          name
        }
        measure_unit_id
      }
    }
  }
}
    `;

/**
 * __useRecipeFoodCandidatesQuery__
 *
 * To run a query within a React component, call `useRecipeFoodCandidatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeFoodCandidatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeFoodCandidatesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRecipeFoodCandidatesQuery(baseOptions: Apollo.QueryHookOptions<RecipeFoodCandidatesQuery, RecipeFoodCandidatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecipeFoodCandidatesQuery, RecipeFoodCandidatesQueryVariables>(RecipeFoodCandidatesDocument, options);
      }
export function useRecipeFoodCandidatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipeFoodCandidatesQuery, RecipeFoodCandidatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecipeFoodCandidatesQuery, RecipeFoodCandidatesQueryVariables>(RecipeFoodCandidatesDocument, options);
        }
export type RecipeFoodCandidatesQueryHookResult = ReturnType<typeof useRecipeFoodCandidatesQuery>;
export type RecipeFoodCandidatesLazyQueryHookResult = ReturnType<typeof useRecipeFoodCandidatesLazyQuery>;
export type RecipeFoodCandidatesQueryResult = Apollo.QueryResult<RecipeFoodCandidatesQuery, RecipeFoodCandidatesQueryVariables>;
export const InsertFoodCandidateForIngredientDocument = gql`
    mutation InsertFoodCandidateForIngredient($object: recipe_ingredient_food_candidate_insert_input!) {
  insert_recipe_ingredient_food_candidate_one(
    object: $object
    on_conflict: {constraint: recipe_ingredient_food_candidate_recipe_ingredient_id_food_cand, update_columns: [food_candidate_id, food_candidate_portion_id]}
  ) {
    id
  }
}
    `;
export type InsertFoodCandidateForIngredientMutationFn = Apollo.MutationFunction<InsertFoodCandidateForIngredientMutation, InsertFoodCandidateForIngredientMutationVariables>;

/**
 * __useInsertFoodCandidateForIngredientMutation__
 *
 * To run a mutation, you first call `useInsertFoodCandidateForIngredientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertFoodCandidateForIngredientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertFoodCandidateForIngredientMutation, { data, loading, error }] = useInsertFoodCandidateForIngredientMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useInsertFoodCandidateForIngredientMutation(baseOptions?: Apollo.MutationHookOptions<InsertFoodCandidateForIngredientMutation, InsertFoodCandidateForIngredientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertFoodCandidateForIngredientMutation, InsertFoodCandidateForIngredientMutationVariables>(InsertFoodCandidateForIngredientDocument, options);
      }
export type InsertFoodCandidateForIngredientMutationHookResult = ReturnType<typeof useInsertFoodCandidateForIngredientMutation>;
export type InsertFoodCandidateForIngredientMutationResult = Apollo.MutationResult<InsertFoodCandidateForIngredientMutation>;
export type InsertFoodCandidateForIngredientMutationOptions = Apollo.BaseMutationOptions<InsertFoodCandidateForIngredientMutation, InsertFoodCandidateForIngredientMutationVariables>;
export const RecipesQueryDocument = gql`
    query RecipesQuery($where: recipes_bool_exp!, $limit: Int = 10, $offset: Int = 0) {
  recipes(
    where: $where
    limit: $limit
    offset: $offset
    order_by: {updated_at: asc}
  ) {
    id
    name
    source
    created_at
  }
  recipes_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useRecipesQueryQuery__
 *
 * To run a query within a React component, call `useRecipesQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipesQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipesQueryQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useRecipesQueryQuery(baseOptions: Apollo.QueryHookOptions<RecipesQueryQuery, RecipesQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecipesQueryQuery, RecipesQueryQueryVariables>(RecipesQueryDocument, options);
      }
export function useRecipesQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipesQueryQuery, RecipesQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecipesQueryQuery, RecipesQueryQueryVariables>(RecipesQueryDocument, options);
        }
export type RecipesQueryQueryHookResult = ReturnType<typeof useRecipesQueryQuery>;
export type RecipesQueryLazyQueryHookResult = ReturnType<typeof useRecipesQueryLazyQuery>;
export type RecipesQueryQueryResult = Apollo.QueryResult<RecipesQueryQuery, RecipesQueryQueryVariables>;
export const InsertRecipeDocument = gql`
    mutation InsertRecipe($recipe: recipes_insert_input!) {
  insert_recipes_one(
    object: $recipe
    on_conflict: {constraint: recipes_source_key, update_columns: [name, image, extraction_metadata, updated_at]}
  ) {
    id
  }
}
    `;
export type InsertRecipeMutationFn = Apollo.MutationFunction<InsertRecipeMutation, InsertRecipeMutationVariables>;

/**
 * __useInsertRecipeMutation__
 *
 * To run a mutation, you first call `useInsertRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertRecipeMutation, { data, loading, error }] = useInsertRecipeMutation({
 *   variables: {
 *      recipe: // value for 'recipe'
 *   },
 * });
 */
export function useInsertRecipeMutation(baseOptions?: Apollo.MutationHookOptions<InsertRecipeMutation, InsertRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertRecipeMutation, InsertRecipeMutationVariables>(InsertRecipeDocument, options);
      }
export type InsertRecipeMutationHookResult = ReturnType<typeof useInsertRecipeMutation>;
export type InsertRecipeMutationResult = Apollo.MutationResult<InsertRecipeMutation>;
export type InsertRecipeMutationOptions = Apollo.BaseMutationOptions<InsertRecipeMutation, InsertRecipeMutationVariables>;
export const GetUserRecipeListsDocument = gql`
    query GetUserRecipeLists {
  recipe_lists {
    id
    name
    recipe_list_items {
      id
      seq_num
      recipe {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetUserRecipeListsQuery__
 *
 * To run a query within a React component, call `useGetUserRecipeListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserRecipeListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserRecipeListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserRecipeListsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserRecipeListsQuery, GetUserRecipeListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserRecipeListsQuery, GetUserRecipeListsQueryVariables>(GetUserRecipeListsDocument, options);
      }
export function useGetUserRecipeListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserRecipeListsQuery, GetUserRecipeListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserRecipeListsQuery, GetUserRecipeListsQueryVariables>(GetUserRecipeListsDocument, options);
        }
export type GetUserRecipeListsQueryHookResult = ReturnType<typeof useGetUserRecipeListsQuery>;
export type GetUserRecipeListsLazyQueryHookResult = ReturnType<typeof useGetUserRecipeListsLazyQuery>;
export type GetUserRecipeListsQueryResult = Apollo.QueryResult<GetUserRecipeListsQuery, GetUserRecipeListsQueryVariables>;
export const InsertRecipeListDocument = gql`
    mutation InsertRecipeList($name: String) {
  insert_recipe_lists_one(object: {name: $name}) {
    id
  }
}
    `;
export type InsertRecipeListMutationFn = Apollo.MutationFunction<InsertRecipeListMutation, InsertRecipeListMutationVariables>;

/**
 * __useInsertRecipeListMutation__
 *
 * To run a mutation, you first call `useInsertRecipeListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertRecipeListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertRecipeListMutation, { data, loading, error }] = useInsertRecipeListMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useInsertRecipeListMutation(baseOptions?: Apollo.MutationHookOptions<InsertRecipeListMutation, InsertRecipeListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertRecipeListMutation, InsertRecipeListMutationVariables>(InsertRecipeListDocument, options);
      }
export type InsertRecipeListMutationHookResult = ReturnType<typeof useInsertRecipeListMutation>;
export type InsertRecipeListMutationResult = Apollo.MutationResult<InsertRecipeListMutation>;
export type InsertRecipeListMutationOptions = Apollo.BaseMutationOptions<InsertRecipeListMutation, InsertRecipeListMutationVariables>;
export const DeleteRecipeListDocument = gql`
    mutation DeleteRecipeList($id: Int) {
  delete_recipe_lists(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
    `;
export type DeleteRecipeListMutationFn = Apollo.MutationFunction<DeleteRecipeListMutation, DeleteRecipeListMutationVariables>;

/**
 * __useDeleteRecipeListMutation__
 *
 * To run a mutation, you first call `useDeleteRecipeListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecipeListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecipeListMutation, { data, loading, error }] = useDeleteRecipeListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRecipeListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRecipeListMutation, DeleteRecipeListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRecipeListMutation, DeleteRecipeListMutationVariables>(DeleteRecipeListDocument, options);
      }
export type DeleteRecipeListMutationHookResult = ReturnType<typeof useDeleteRecipeListMutation>;
export type DeleteRecipeListMutationResult = Apollo.MutationResult<DeleteRecipeListMutation>;
export type DeleteRecipeListMutationOptions = Apollo.BaseMutationOptions<DeleteRecipeListMutation, DeleteRecipeListMutationVariables>;
export const ViewRecipeQueryDocument = gql`
    query ViewRecipeQuery($id: Int!) {
  recipes_by_pk(id: $id) {
    id
    name
    created_at
    source
    updated_at
    video
    recipe_ingredient_groups(order_by: {seq_num: asc}) {
      name
      group_ingredients(order_by: {seq_num: asc}) {
        id
        seq_num
        text
        name
        amount
        comment
        units
        video_timestamp
        recipe_ingredient_food_candidates {
          food_portion {
            gram_weight
            amount
            modifier
            measure_unit {
              name
            }
            portion_description
          }
          food {
            description
          }
        }
      }
    }
    recipe_directions(order_by: {seq_num: asc}) {
      seq_num
      step
      video_timestamp
    }
    recipe_tags(order_by: {seq_num: asc}) {
      name
      id
    }
  }
}
    `;

/**
 * __useViewRecipeQueryQuery__
 *
 * To run a query within a React component, call `useViewRecipeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewRecipeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewRecipeQueryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useViewRecipeQueryQuery(baseOptions: Apollo.QueryHookOptions<ViewRecipeQueryQuery, ViewRecipeQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewRecipeQueryQuery, ViewRecipeQueryQueryVariables>(ViewRecipeQueryDocument, options);
      }
export function useViewRecipeQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewRecipeQueryQuery, ViewRecipeQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewRecipeQueryQuery, ViewRecipeQueryQueryVariables>(ViewRecipeQueryDocument, options);
        }
export type ViewRecipeQueryQueryHookResult = ReturnType<typeof useViewRecipeQueryQuery>;
export type ViewRecipeQueryLazyQueryHookResult = ReturnType<typeof useViewRecipeQueryLazyQuery>;
export type ViewRecipeQueryQueryResult = Apollo.QueryResult<ViewRecipeQueryQuery, ViewRecipeQueryQueryVariables>;
export const GetRecipeListsDocument = gql`
    query GetRecipeLists {
  recipe_lists {
    id
    name
  }
}
    `;

/**
 * __useGetRecipeListsQuery__
 *
 * To run a query within a React component, call `useGetRecipeListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecipeListsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecipeListsQuery, GetRecipeListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipeListsQuery, GetRecipeListsQueryVariables>(GetRecipeListsDocument, options);
      }
export function useGetRecipeListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeListsQuery, GetRecipeListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipeListsQuery, GetRecipeListsQueryVariables>(GetRecipeListsDocument, options);
        }
export type GetRecipeListsQueryHookResult = ReturnType<typeof useGetRecipeListsQuery>;
export type GetRecipeListsLazyQueryHookResult = ReturnType<typeof useGetRecipeListsLazyQuery>;
export type GetRecipeListsQueryResult = Apollo.QueryResult<GetRecipeListsQuery, GetRecipeListsQueryVariables>;
export const InsertRecipeIntoListDocument = gql`
    mutation InsertRecipeIntoList($recipe_id: Int = 10, $recipe_list_id: Int = 10) {
  insert_recipe_list_items_one(
    object: {recipe_id: $recipe_id, recipe_list_id: $recipe_list_id}
  ) {
    id
  }
}
    `;
export type InsertRecipeIntoListMutationFn = Apollo.MutationFunction<InsertRecipeIntoListMutation, InsertRecipeIntoListMutationVariables>;

/**
 * __useInsertRecipeIntoListMutation__
 *
 * To run a mutation, you first call `useInsertRecipeIntoListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertRecipeIntoListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertRecipeIntoListMutation, { data, loading, error }] = useInsertRecipeIntoListMutation({
 *   variables: {
 *      recipe_id: // value for 'recipe_id'
 *      recipe_list_id: // value for 'recipe_list_id'
 *   },
 * });
 */
export function useInsertRecipeIntoListMutation(baseOptions?: Apollo.MutationHookOptions<InsertRecipeIntoListMutation, InsertRecipeIntoListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertRecipeIntoListMutation, InsertRecipeIntoListMutationVariables>(InsertRecipeIntoListDocument, options);
      }
export type InsertRecipeIntoListMutationHookResult = ReturnType<typeof useInsertRecipeIntoListMutation>;
export type InsertRecipeIntoListMutationResult = Apollo.MutationResult<InsertRecipeIntoListMutation>;
export type InsertRecipeIntoListMutationOptions = Apollo.BaseMutationOptions<InsertRecipeIntoListMutation, InsertRecipeIntoListMutationVariables>;
export const HideRecipeDocument = gql`
    mutation HideRecipe($id: Int = 0) {
  update_recipes_by_pk(pk_columns: {id: $id}, _set: {visible: false}) {
    id
  }
}
    `;
export type HideRecipeMutationFn = Apollo.MutationFunction<HideRecipeMutation, HideRecipeMutationVariables>;

/**
 * __useHideRecipeMutation__
 *
 * To run a mutation, you first call `useHideRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHideRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hideRecipeMutation, { data, loading, error }] = useHideRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHideRecipeMutation(baseOptions?: Apollo.MutationHookOptions<HideRecipeMutation, HideRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HideRecipeMutation, HideRecipeMutationVariables>(HideRecipeDocument, options);
      }
export type HideRecipeMutationHookResult = ReturnType<typeof useHideRecipeMutation>;
export type HideRecipeMutationResult = Apollo.MutationResult<HideRecipeMutation>;
export type HideRecipeMutationOptions = Apollo.BaseMutationOptions<HideRecipeMutation, HideRecipeMutationVariables>;