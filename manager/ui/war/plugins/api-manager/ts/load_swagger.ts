export const dataSwagger = `
openapi: 3.0.1
info:
  title: API Manager REST API
  description: >-
    The API Manager REST API is used by the API Manager UI to get stuff done.
    You can use it to automate any API Management task you wish. For example,
    create new Organizations, Plans, Clients, and APIs.
  version: 3.1.0-SNAPSHOT
servers:
  - url: /apiman
paths:
  /actions/contracts:
    post:
      tags:
        - Actions
      summary: Approve a contract
      description: >-
        Approve a contract (assuming it requires approval). If all contracts for
        a given Client Version have been approved, then it will transition from
        \`AwaitingApproval\` to \`Ready\`, and hence can be published.
      operationId: approveContract
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ContractActionDto'
      responses:
        '204':
          description: If the action completes successfully.
  /actions:
    post:
      tags:
        - Actions
      summary: Execute an Entity Action
      description: >-
        Call this endpoint in order to execute actions for apiman entities such
        as Plans, APIs, or Clients. The type of the action must be included in
        the request payload.
      operationId: performAction
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ActionBean'
      responses:
        '204':
          description: If the action completes successfully.
  /blobs/{uid}:
    get:
      tags:
        - Blobs
      operationId: getBlob
      parameters:
        - name: uid
          in: path
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            '*/*': {}
  /blobs:
    post:
      tags:
        - Blobs
      operationId: uploadBlob
      requestBody:
        content:
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/MultipartFormDataInput'
        required: true
      responses:
        '201':
          description: If your upload has been accepted
  /devportal/organizations:
    post:
      tags:
        - Devportal
        - Experimental
      summary: Create home org for developer
      description: >-
        Create a 'home' organization on behalf of the portal user (they may not
        normally have permissions to do this themselves).
      operationId: createHomeOrgForDeveloper
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewOrganizationBean'
      responses:
        default:
          description: default response
          content:
            application/json: {}
  /devportal/organizations/{orgId}/apis/{apiId}/versions/{apiVersion}/definition:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get an API Definition (schema) for an API Version
      operationId: getApiDefinition
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
        - name: apiVersion
          in: path
          description: The API Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json: {}
            application/wsdl+xml: {}
            application/x-yaml: {}
  /devportal/organizations/{orgId}/apis/{apiId}/versions/{apiVersion}:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get a specific API Version
      operationId: getApiVersion
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
        - name: apiVersion
          in: path
          description: The API Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiVersionBeanDto'
  /devportal/organizations/{orgId}/apis/{apiId}/versions/{apiVersion}/endpoint:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get endpoint information for an API Version
      operationId: getApiVersionEndpointInfo
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
        - name: apiVersion
          in: path
          description: The API Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiVersionEndpointSummaryBean'
  /devportal/organizations/{orgId}/apis/{apiId}/versions/{apiVersion}/plans:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get all Plans for an API Version
      operationId: getApiVersionPlans
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
        - name: apiVersion
          in: path
          description: The API Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/DeveloperApiPlanSummaryDto'
  /devportal/apis/featured:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get all featured APIs
      operationId: getFeaturedApis
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanApiSummaryBean'
  /devportal/organizations/{orgId}/plans/{planId}/versions/{planVersion}/policies/{policyId}:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get a specific policy on a plan version
      operationId: getPlanPolicy
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID
          required: true
          schema:
            type: string
        - name: planVersion
          in: path
          description: The Plan Version
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID
          required: true
          schema:
            type: integer
            format: int64
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PolicyBean'
  /devportal/organizations/{orgId}/apis/{apiId}/versions/{apiVersion}/policies:
    get:
      tags:
        - Devportal
        - Experimental
      summary: List all policies on an API Version
      operationId: listApiPolicies
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
        - name: apiVersion
          in: path
          description: The API Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ApiVersionPolicySummaryDto'
  /devportal/organizations/{orgId}/apis/{apiId}/versions:
    get:
      tags:
        - Devportal
        - Experimental
      summary: List all API Versions within an organization
      operationId: listApiVersions
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ApiVersionSummaryBean'
  /devportal/organizations/{orgId}/plans/{planId}/versions/{planVersion}/policies:
    get:
      tags:
        - Devportal
        - Experimental
      summary: List all policies on a specific Plan Version
      operationId: listPlanPolicies
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID
          required: true
          schema:
            type: string
        - name: planVersion
          in: path
          description: The Plan Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PolicySummaryBean'
  /devportal/search/apis:
    post:
      tags:
        - Devportal
        - Experimental
      summary: Search Apiman APIs
      operationId: searchApis
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SearchCriteriaBean'
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanApiSummaryBean'
  /developers:
    get:
      tags:
        - Developers
      operationId: getDevelopers
      responses:
        '200':
          description: If the developer list was successfully returned
        '403':
          description: If the access is not allowed
      deprecated: true
    post:
      tags:
        - Developers
      operationId: create
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DeveloperBean'
      responses:
        '200':
          description: If the developer was successfully created
        '403':
          description: If the access is not allowed
      deprecated: true
  /developers/{developerId}:
    get:
      tags:
        - Developers
      operationId: get
      parameters:
        - name: developerId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the developer was successfully returned
        '403':
          description: If the access is not allowed
        '404':
          description: If the developer does not exist.
      deprecated: true
    put:
      tags:
        - Developers
      operationId: update
      parameters:
        - name: developerId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateDeveloperBean'
      responses:
        '204':
          description: If the developer was successfully updated
        '403':
          description: If the access is not allowed
        '404':
          description: If the developer does not exist.
      deprecated: true
    delete:
      tags:
        - Developers
      operationId: delete
      parameters:
        - name: developerId
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the developer was successfully deleted
        '403':
          description: If the access is not allowed
        '404':
          description: If the developer does not exist.
      deprecated: true
  /developers/{developerId}/apis:
    get:
      tags:
        - Developers
      operationId: getAllApiVersions
      parameters:
        - name: developerId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the the list was successfully returned
        '403':
          description: If the access is not allowed
        '404':
          description: If the developer does not exist.
      deprecated: true
  /developers/{developerId}/contracts:
    get:
      tags:
        - Developers
      operationId: getAllClientContracts
      parameters:
        - name: developerId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the the list was successfully returned
        '403':
          description: If the access is not allowed
        '404':
          description: If the developer does not exist.
      deprecated: true
  /developers/{developerId}/clients:
    get:
      tags:
        - Developers
      operationId: getAllClientVersions
      parameters:
        - name: developerId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the the list was successfully returned
        '403':
          description: If the access is not allowed
        '404':
          description: If the developer does not exist.
      deprecated: true
  /developers/apis:
    get:
      tags:
        - Developers
      operationId: getAllPublicApiVersions
      responses:
        '200':
          description: If the list of public apis was successfully returned
        '403':
          description: If the access is not allowed
      deprecated: true
  /developers/{developerId}/organizations/{organizationId}/apis/{apiId}/versions/{version}/definition:
    get:
      tags:
        - Developers
      operationId: getApiDefinition_1
      parameters:
        - name: developerId
          in: path
          required: true
          schema:
            type: string
        - name: organizationId
          in: path
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          required: true
          schema:
            type: string
        - name: version
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the API definition is successfully returned.
        '404':
          description: If the API version does not exist.
      deprecated: true
  /developers/organizations/{organizationId}/apis/{apiId}/versions/{version}/definition:
    get:
      tags:
        - Developers
      operationId: getPublicApiDefinition
      parameters:
        - name: organizationId
          in: path
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          required: true
          schema:
            type: string
        - name: version
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the API definition is successfully returned.
        '404':
          description: If the API version does not exist.
      deprecated: true
  /downloads/{downloadId}:
    get:
      tags:
        - Downloads
      operationId: download
      parameters:
        - name: downloadId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: On success.
  /events/sso/users:
    post:
      tags:
        - Events
      operationId: newAccountCreated
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewAccountCreatedDto'
      responses:
        default:
          description: default response
          content:
            '*/*': {}
  /gateways:
    get:
      tags:
        - Gateways
      operationId: list
      responses:
        '200':
          description: If the gateways are successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/GatewaySummaryBean'
    put:
      tags:
        - Gateways
      operationId: test
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewGatewayBean'
      responses:
        '200':
          description: If the test is performed (regardless of the outcome of the test).
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GatewayTestResultBean'
    post:
      tags:
        - Gateways
      operationId: create_1
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewGatewayBean'
      responses:
        '200':
          description: If the Gateway is created successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GatewayBean'
  /gateways/{gatewayId}:
    get:
      tags:
        - Gateways
      operationId: get_1
      parameters:
        - name: gatewayId
          in: path
          description: The ID of the Gateway to get
          required: true
          schema:
            type: string
      responses:
        '200':
          description: the Gateway is returned successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GatewayBean'
    put:
      tags:
        - Gateways
      operationId: update_1
      parameters:
        - name: gatewayId
          in: path
          description: The ID of the Gateway to update
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateGatewayBean'
      responses:
        '204':
          description: If the update is successful.
    delete:
      tags:
        - Gateways
      operationId: delete_1
      parameters:
        - name: gatewayId
          in: path
          description: The ID of the Gateway to delete
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the delete is successful.
  /gateways/{gatewayId}/endpoint:
    get:
      tags:
        - Gateways
      operationId: getGatewayEndpoint
      parameters:
        - name: gatewayId
          in: path
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GatewayEndpointSummaryBean'
      deprecated: true
  /organizations/{organizationId}/apis:
    get:
      tags:
        - Organizations
      summary: List APIs
      operationId: listApis
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of APIs is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ApiSummaryBean'
        '404':
          description: If the Organization does not exist.
    post:
      tags:
        - Organizations
      summary: Create API
      operationId: createApi
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewApiBean'
        required: true
      responses:
        '200':
          description: If the API is successfully created.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiBeanDto'
        '404':
          description: If the Organization does not exist.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/policies:
    get:
      tags:
        - Organizations
      summary: List All API Policies
      operationId: listApiPolicies_1
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of Policies is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PolicySummaryBean'
        '404':
          description: If the API does not exist.
    post:
      tags:
        - Organizations
      summary: Add API Policy
      operationId: createApiPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewPolicyBean'
      responses:
        '200':
          description: Full details about the newly added Policy
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PolicyBean'
        '404':
          description: If the API does not exist.
  /organizations/{organizationId}/apis/{apiId}/versions:
    get:
      tags:
        - Organizations
      summary: List API Versions
      operationId: listApiVersions_1
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of API versions is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ApiVersionSummaryBean'
    post:
      tags:
        - Organizations
      summary: Create API Version
      operationId: createApiVersion
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewApiVersionBean'
      responses:
        '200':
          description: If the API version is created successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiVersionBeanDto'
        '404':
          description: If the API does not exist.
        '409':
          description: If the API version already exists.
  /organizations/{organizationId}/clients:
    get:
      tags:
        - Organizations
      summary: List Clients
      operationId: listClients
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of Clients is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ClientSummaryBean'
        '404':
          description: If the Organization does not exist.
    post:
      tags:
        - Organizations
      summary: Create Client
      description: >-
        Use this endpoint to create a new Client.It is important to also create
        an initial version of the Client (e.g. 1.0). This can either be done by
        including the 'initialVersion' property in the request, or by
        immediately following up with a call to Create Client Version If the
        former is done, then a first  Client version will be created
        automatically by this endpoint.
      operationId: createClient
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewClientBean'
      responses:
        '200':
          description: If the Client is successfully created.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ClientBean'
        '404':
          description: If the Organization does not exist.
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/policies:
    get:
      tags:
        - Organizations
      summary: List All Client Policies
      operationId: listClientPolicies
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of Policies is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PolicySummaryBean'
        '404':
          description: If the Client does not exist.
    post:
      tags:
        - Organizations
      summary: Add Client Policy
      operationId: createClientPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewPolicyBean'
      responses:
        '200':
          description: If the Policy is successfully added.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PolicyBean'
        '404':
          description: If the Client does not exist.
  /organizations/{organizationId}/clients/{clientId}/versions:
    get:
      tags:
        - Organizations
      summary: List Client Versions
      operationId: listClientVersions
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of Client versions is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ClientVersionSummaryBean'
    post:
      tags:
        - Organizations
      summary: Create Client Version
      operationId: createClientVersion
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewClientVersionBean'
      responses:
        '200':
          description: If the Client version is created successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ClientVersionBean'
        '404':
          description: If the Client does not exist.
        '409':
          description: If the Client version already exists.
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/contracts:
    get:
      tags:
        - Organizations
      summary: List All Contracts for a Client
      operationId: getClientVersionContracts
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of Contracts is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ContractSummaryBean'
        '404':
          description: If the Client is not found.
    post:
      tags:
        - Organizations
      summary: Create an API Contract
      description: >-
        Create a Contract between the Client and an API. In order to create a
        Contract, the caller must specify the Organization, ID, and Version of
        the API.Additionally, the caller must specify the ID of the plan it
        wants to use for the contract with the API.
      operationId: createContract
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewContractBean'
      responses:
        '200':
          description: If the Contract is successfully created.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContractBean'
        '404':
          description: If the Client version does not exist.
    delete:
      tags:
        - Organizations
      summary: Break All Contracts
      operationId: deleteAllContracts
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the operation is successful.
        '404':
          description: If the Client does not exist.
  /organizations:
    post:
      tags:
        - Organizations
      summary: Create Organization
      description: >-
        Create a new Organization. This can be considered a type of namespace.
        APIs, Clients and Plans are defined within an organization. Using other
        API calls, you can add users to an organization and assign them
        fine-grained permissions
      operationId: createOrg
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewOrganizationBean'
      responses:
        '200':
          description: If the Organization was successfully created.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrganizationBean'
  /organizations/{organizationId}/plans:
    get:
      tags:
        - Organizations
      summary: List Plans
      operationId: listPlans
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of Plans is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PlanSummaryBean'
        '404':
          description: If the Organization does not exist.
    post:
      tags:
        - Organizations
      summary: Create Plan
      operationId: createPlan
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewPlanBean'
      responses:
        '200':
          description: If the Plan is successfully created.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PlanBean'
        '404':
          description: If the Organization does not exist.
  /organizations/{organizationId}/plans/{planId}/versions/{version}/policies:
    get:
      tags:
        - Organizations
      summary: List All Plan Policies
      operationId: listPlanPolicies_1
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Plan version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of Policies is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PolicySummaryBean'
        '404':
          description: If the Plan does not exist.
    post:
      tags:
        - Organizations
      summary: Add Plan Policy
      operationId: createPlanPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Plan version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewPolicyBean'
      responses:
        '200':
          description: If the Policy is successfully added.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PolicyBean'
        '404':
          description: If the Plan does not exist.
  /organizations/{organizationId}/plans/{planId}/versions:
    get:
      tags:
        - Organizations
      summary: List Plan Versions
      operationId: listPlanVersions
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of Plan versions is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PlanVersionSummaryBean'
    post:
      tags:
        - Organizations
      summary: Create Plan Version
      operationId: createPlanVersion
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewPlanVersionBean'
      responses:
        '200':
          description: If the Plan version is created successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PlanVersionBean'
        '404':
          description: If the Plan does not exist.
        '409':
          description: If the Plan version already exists.
  /organizations/{organizationId}/apis/{apiId}:
    get:
      tags:
        - Organizations
      summary: Get API By ID
      operationId: getApi
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the API is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiBeanDto'
        '404':
          description: If the API does not exist.
    put:
      tags:
        - Organizations
      summary: Update API
      operationId: updateApi
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateApiBean'
      responses:
        '204':
          description: If the API is updated successfully.
        '404':
          description: If the API does not exist.
    delete:
      tags:
        - Organizations
      summary: Delete API
      operationId: deleteApi
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the API is updated successfully.
        '404':
          description: If the API does not exist.
        '409':
          description: If the API cannot be deleted.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/definition:
    get:
      tags:
        - Organizations
      summary: Get API Definition
      operationId: getApiDefinition_2
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the API definition is successfully returned.
        '404':
          description: If the API version does not exist.
    put:
      tags:
        - Organizations
      summary: Update API Definition
      operationId: updateApiDefinition
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the API definition was successfully updated.
        '404':
          description: If the API does not exist.
    post:
      tags:
        - Organizations
      summary: Update API Definition from URL
      operationId: updateApiDefinitionFromURL
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewApiDefinitionBean'
      responses:
        '204':
          description: If the API definition was successfully updated.
        '404':
          description: If the API does not exist.
    delete:
      tags:
        - Organizations
      summary: Remove API Definition
      operationId: deleteApiDefinition
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the API definition was successfully deleted.
        '404':
          description: If the API does not exist.
  /organizations/{organizationId}/apis/{apiId}/image:
    delete:
      tags:
        - Organizations
      summary: Delete API Image
      operationId: deleteApiImage
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the API is updated successfully.
        '404':
          description: If the API does not exist.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/policies/{policyId}:
    get:
      tags:
        - Organizations
      summary: Get API Policy
      operationId: getApiPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID.
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: If the Policy is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PolicyBean'
        '404':
          description: If the API does not exist.
    put:
      tags:
        - Organizations
      summary: Update API Policy
      operationId: updateApiPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID.
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdatePolicyBean'
      responses:
        '204':
          description: If the Policy was successfully updated.
        '404':
          description: If the Policy does not exist.
    delete:
      tags:
        - Organizations
      summary: Remove API Policy
      operationId: deleteApiPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID.
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '204':
          description: If the Policy was successfully deleted.
        '404':
          description: If the Policy does not exist.
  /organizations/{organizationId}/clients/{clientId}:
    get:
      tags:
        - Organizations
      summary: Get Client By ID
      description: >-
        Use this endpoint to retrieve information about a single Client by ID.
        This only returns information about the Client, not any particular
        version of the client.
      operationId: getClient
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the Client is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ClientBean'
        '404':
          description: If the Client does not exist.
    put:
      tags:
        - Organizations
      summary: Update Client
      operationId: updateClient
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateClientBean'
      responses:
        '204':
          description: If the Client is updated successfully.
        '404':
          description: If the Client does not exist.
    delete:
      tags:
        - Organizations
      summary: Delete a client
      operationId: deleteClient
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID the client exists within
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The ClientApp ID to delete
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the Organization was successfully deleted
        '409':
          description: >-
            If the delete preconditions have not been met (i.e. sub-elements are
            still active, such as still-registered ClientVersions).
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/policies/{policyId}:
    get:
      tags:
        - Organizations
      summary: Get Client Policy
      operationId: getClientPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID.
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: If the Policy is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PolicyBean'
        '404':
          description: If the Client does not exist.
    put:
      tags:
        - Organizations
      summary: Update Client Policy
      operationId: updateClientPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID.
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdatePolicyBean'
      responses:
        '204':
          description: If the Policy was successfully updated.
        '404':
          description: If the Organization, Client, or Policy does not exist.
    delete:
      tags:
        - Organizations
      summary: Remove Client Policy
      operationId: deleteClientPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID.
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '204':
          description: If the Policy was successfully deleted.
        '404':
          description: If the Policy does not exist.
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/contracts/{contractId}:
    get:
      tags:
        - Organizations
      summary: Get API Contract
      description: Detailed information about a single API Contract for a Client
      operationId: getContract
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
        - name: contractId
          in: path
          description: The ID of the Contract.
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: If the Contract is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContractBean'
        '404':
          description: If the Contract is not found.
    delete:
      tags:
        - Organizations
      summary: Break Contract
      operationId: deleteContract
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
        - name: contractId
          in: path
          description: The Contract ID.
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '204':
          description: If the Contract is successfully broken.
        '404':
          description: If the Contract does not exist.
  /organizations/{organizationId}:
    get:
      tags:
        - Organizations
      summary: Get Organization By ID
      operationId: getOrg
      parameters:
        - name: organizationId
          in: path
          description: The Organization id.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the Organization was successfully returned
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrganizationBean'
        '404':
          description: If the Organization does not exist
    put:
      tags:
        - Organizations
      summary: Update Organization By ID
      description: Updates meta-information about a single Organization
      operationId: updateOrg
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateOrganizationBean'
      responses:
        '200':
          description: If the Organization meta-data is successfully updated.
        '404':
          description: If the Organization does not exist.
    delete:
      tags:
        - Organizations
      summary: Delete an organization
      operationId: deleteOrg
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID to delete
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the Organization was successfully deleted
        '409':
          description: >-
            If the delete preconditions have not been met (i.e. sub-elements are
            still active, such as still-published APIs).
  /organizations/{organizationId}/plans/{planId}:
    get:
      tags:
        - Organizations
      summary: Get Plan By ID
      operationId: getPlan
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the Plan is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PlanBean'
        '404':
          description: If the Plan does not exist.
    put:
      tags:
        - Organizations
      summary: Update Plan
      operationId: updatePlan
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdatePlanBean'
      responses:
        '204':
          description: If the Plan is updated successfully.
        '404':
          description: If the Plan does not exist.
    delete:
      tags:
        - Organizations
      summary: Delete Plan
      operationId: deletePlan
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the Plan was successfully deleted
        '404':
          description: If the Plan does not exist.
        '409':
          description: If the Plan cannot be deleted.
  /organizations/{organizationId}/plans/{planId}/versions/{version}/policies/{policyId}:
    get:
      tags:
        - Organizations
      summary: Get Plan Policy
      operationId: getPlanPolicy_1
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Plan version.
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID.
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: If the Policy is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PolicyBean'
        '404':
          description: If the Plan does not exist.
    put:
      tags:
        - Organizations
      summary: Update Plan Policy
      operationId: updatePlanPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Plan version.
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID.
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdatePolicyBean'
      responses:
        '204':
          description: If the Policy was successfully updated.
        '404':
          description: If the Policy does not exist.
    delete:
      tags:
        - Organizations
      summary: Remove Plan Policy
      operationId: deletePlanPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Plan version.
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID.
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '204':
          description: If the Policy was successfully deleted.
        '404':
          description: If the Policy does not exist.
  /organizations/{organizationId}/apis/{apiId}/activity:
    get:
      tags:
        - Organizations
      summary: Get API Activity
      operationId: getApiActivity
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: page
          in: query
          description: Which page of activity should be returned.
          schema:
            type: integer
            format: int32
        - name: count
          in: query
          description: The number of entries per page to return.
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: If the audit information is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanAuditEntryBean'
        '404':
          description: If the API does not exist.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/plans/{planId}/policyChain:
    get:
      tags:
        - Organizations
      summary: Get API Policy Chain
      operationId: getApiPolicyChain
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the Policy Chain is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PolicyChainBean'
        '404':
          description: If the API does not exist.
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/apiregistry/json:
    get:
      tags:
        - Organizations
      summary: Get API Registry (JSON)
      operationId: getApiRegistryJSON
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
        - name: download
          in: query
          description: Query parameter set to true in order to generate a download link.
          schema:
            type: string
      responses:
        '200':
          description: If the API Registry information is successfully returned.
        '404':
          description: If the Client does not exist.
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/apiregistry/xml:
    get:
      tags:
        - Organizations
      summary: Get API Registry (XML)
      operationId: getApiRegistryXML
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
        - name: download
          in: query
          description: Query parameter set to true in order to generate a download link.
          schema:
            type: string
      responses:
        '200':
          description: If the API Registry information is successfully returned.
        '404':
          description: If the Client does not exist.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}:
    get:
      tags:
        - Organizations
      summary: Get API Version
      operationId: getApiVersion_1
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the API version is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiVersionBeanDto'
        '404':
          description: If the API version does not exist.
    put:
      tags:
        - Organizations
      summary: Update API Version
      operationId: updateApiVersion
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateApiVersionBean'
      responses:
        '204':
          description: If the API version information was successfully updated.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiVersionBeanDto'
        '404':
          description: If the API does not exist.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/activity:
    get:
      tags:
        - Organizations
      summary: Get API Version Activity
      operationId: getApiVersionActivity
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: page
          in: query
          description: Which page of activity data to return.
          schema:
            type: integer
            format: int32
        - name: count
          in: query
          description: The number of entries per page to return.
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: Audit activity entries
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanAuditEntryBean'
        '404':
          description: API version does not exist.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/contracts:
    get:
      tags:
        - Organizations
      summary: List API Contracts
      operationId: getApiVersionContracts
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: page
          in: query
          description: Which page of Contracts to return.
          schema:
            type: integer
            format: int32
        - name: count
          in: query
          description: The number of Contracts per page to return.
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: If the list of Contracts is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ContractSummaryBean'
        '404':
          description: If the API does not exist.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/endpoint:
    get:
      tags:
        - Organizations
      summary: Get API Endpoint
      operationId: getApiVersionEndpointInfo_1
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the endpoint information is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiVersionEndpointSummaryBean'
        '404':
          description: If the API does not exist.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/plans:
    get:
      tags:
        - Organizations
      summary: List API Plans
      operationId: getApiVersionPlans_1
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the API plans are successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ApiPlanSummaryBean'
        '404':
          description: If the API cannot be found.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/status:
    get:
      tags:
        - Organizations
      summary: Get API Version Status
      operationId: getApiVersionStatus
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the status information is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiVersionStatusBean'
        '404':
          description: If the API version does not exist.
  /organizations/{organizationId}/clients/{clientId}/activity:
    get:
      tags:
        - Organizations
      summary: Get Client Activity
      description: audit activity information about the Client.
      operationId: getClientActivity
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: page
          in: query
          description: Which page of activity should be returned.
          schema:
            type: integer
            format: int32
        - name: count
          in: query
          description: The number of entries per page to return.
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: If the audit information is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanAuditEntryBean'
        '404':
          description: If the Client does not exist.
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/apikey:
    get:
      tags:
        - Organizations
      summary: Get API Key
      operationId: getClientApiKey
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client Version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the Client's API Key is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiKeyBean'
        '404':
          description: If the Client does not exist.
    put:
      tags:
        - Organizations
      summary: Update API Key
      description: >-
        Update the API Key for the given client. You can either provide your own
        custom (must be unique) API Key, or you can send an empty request and
        Apiman will generate a new API key for you. If the client is registered
        with one or more gateways, this call will fail (API Key can only be
        modified if the client is not currently registered).
      operationId: updateClientApiKey
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client Version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ApiKeyBean'
      responses:
        '200':
          description: If the Client's API Key is successfully updated.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiKeyBean'
        '404':
          description: If the Client does not exist.
        '409':
          description: If the Client has the wrong status.
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/metrics/apiUsage:
    get:
      tags:
        - Organizations
      summary: Get Client Usage Metrics (per API)
      operationId: getClientUsagePerApi
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The client version.
          required: true
          schema:
            type: string
        - name: from
          in: query
          description: The start of a valid date range.
          schema:
            type: string
        - name: to
          in: query
          description: The end of a valid date range.
          schema:
            type: string
      responses:
        '200':
          description: If the metrics data is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ClientUsagePerApiBean'
  /organizations/{organizationId}/clients/{clientId}/versions/{version}:
    get:
      tags:
        - Organizations
      summary: Get Client Version
      operationId: getClientVersion
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the Client version is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ClientVersionBean'
        '404':
          description: If the Client version does not exist.
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/activity:
    get:
      tags:
        - Organizations
      summary: Get Client Version Activity
      operationId: getClientVersionActivity
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
        - name: page
          in: query
          description: Which page of activity data to return.
          schema:
            type: integer
            format: int32
        - name: count
          in: query
          description: The number of entries per page to return.
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: If the audit activity entries are successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanAuditEntryBean'
        '404':
          description: If the Client version does not exist.
  /organizations/{organizationId}/activity:
    get:
      tags:
        - Organizations
      summary: Get Organization Activity
      description: >-
        Returns audit activity information for a single Organization. The audit
        information that is returned represents all the activity associated with
        the specified Organization.
      operationId: getOrgActivity
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: page
          in: query
          description: Which page of activity results to return.
          schema:
            type: integer
            format: int32
        - name: count
          in: query
          description: The number of entries per page.
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: If the audit information is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanAuditEntryBean'
        '404':
          description: If the Organization does not exist.
  /organizations/{organizationId}/plans/{planId}/activity:
    get:
      tags:
        - Organizations
      summary: Get Plan Activity
      operationId: getPlanActivity
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
        - name: page
          in: query
          description: Which page of activity should be returned.
          schema:
            type: integer
            format: int32
        - name: count
          in: query
          description: The number of entries per page to return.
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: If the audit information is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanAuditEntryBean'
        '404':
          description: If the Plan does not exist.
  /organizations/{organizationId}/plans/{planId}/versions/{version}:
    get:
      tags:
        - Organizations
      summary: Get Plan Version
      operationId: getPlanVersion
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Plan version.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the Plan version is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PlanVersionBean'
        '404':
          description: If the Plan version does not exist.
  /organizations/{organizationId}/plans/{planId}/versions/{version}/activity:
    get:
      tags:
        - Organizations
      summary: Get Plan Version Activity
      operationId: getPlanVersionActivity
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Plan version.
          required: true
          schema:
            type: string
        - name: page
          in: query
          description: Which page of activity data to return.
          schema:
            type: integer
            format: int32
        - name: count
          in: query
          description: The number of entries per page to return.
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: If the audit activity entries are successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanAuditEntryBean'
        '404':
          description: If the Plan version does not exist.
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/responseStats:
    get:
      tags:
        - Organizations
      summary: Get API Response Statistics (Histogram)
      operationId: getResponseStats
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: interval
          in: query
          description: A valid interval (month, week, day, hour, minute)
          schema:
            type: string
            enum:
              - month
              - week
              - day
              - hour
              - minute
        - name: from
          in: query
          description: The start of a valid date range.
          schema:
            type: string
        - name: to
          in: query
          description: The end of a valid date range.
          schema:
            type: string
      responses:
        '200':
          description: If the metrics data is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResponseStatsHistogramBean'
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/clientResponseStats:
    get:
      tags:
        - Organizations
      summary: Get API Response Statistics (per Client)
      operationId: getResponseStatsPerClient
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: from
          in: query
          description: The start of a valid date range.
          schema:
            type: string
        - name: to
          in: query
          description: The end of a valid date range.
          schema:
            type: string
      responses:
        '200':
          description: If the metrics data is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResponseStatsPerClientBean'
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/planResponseStats:
    get:
      tags:
        - Organizations
      summary: Get API Response Statistics (per Plan)
      operationId: getResponseStatsPerPlan
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: from
          in: query
          description: The start of a valid date range.
          schema:
            type: string
        - name: to
          in: query
          description: The end of a valid date range.
          schema:
            type: string
      responses:
        '200':
          description: If the metrics data is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResponseStatsPerPlanBean'
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/summaryResponseStats:
    get:
      tags:
        - Organizations
      summary: Get API Response Statistics (Summary)
      operationId: getResponseStatsSummary
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: from
          in: query
          description: The start of a valid date range.
          schema:
            type: string
        - name: to
          in: query
          description: The end of a valid date range.
          schema:
            type: string
      responses:
        '200':
          description: If the metrics data is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ResponseStatsSummaryBean'
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/usage:
    get:
      tags:
        - Organizations
      summary: Get API Usage Metrics
      operationId: getUsage
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: interval
          in: query
          description: A valid interval (month, week, day, hour, minute)
          schema:
            type: string
            enum:
              - month
              - week
              - day
              - hour
              - minute
        - name: from
          in: query
          description: The start of a valid date range.
          schema:
            type: string
        - name: to
          in: query
          description: The end of a valid date range.
          schema:
            type: string
      responses:
        '200':
          description: If the metrics data is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UsageHistogramBean'
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/clientUsage:
    get:
      tags:
        - Organizations
      summary: Get API Usage Metrics (per Client)
      operationId: getUsagePerClient
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: from
          in: query
          description: The start of a valid date range.
          schema:
            type: string
        - name: to
          in: query
          description: The end of a valid date range.
          schema:
            type: string
      responses:
        '200':
          description: If the metrics data is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UsagePerClientBean'
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/planUsage:
    get:
      tags:
        - Organizations
      summary: Get API Usage Metrics (per Plan)
      operationId: getUsagePerPlan
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
        - name: from
          in: query
          description: The start of a valid date range.
          schema:
            type: string
        - name: to
          in: query
          description: The end of a valid date range.
          schema:
            type: string
      responses:
        '200':
          description: If the metrics data is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UsagePerPlanBean'
  /organizations/{organizationId}/roles:
    post:
      tags:
        - Organizations
      summary: Grant Membership(s)
      operationId: grant
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GrantRolesBean'
      responses:
        '204':
          description: If the membership(s) were successfully granted.
  /organizations/{organizationId}/members:
    get:
      tags:
        - Organizations
      summary: List Organization Members
      operationId: listMembers
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the list of members is returned successfully.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/MemberBean'
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/contracts/{contractId}/policies/{policyId}:
    post:
      tags:
        - Organizations
      summary: Probe a policy associated with a contract
      operationId: probeContractPolicy
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
        - name: contractId
          in: path
          description: The contract ID
          required: true
          schema:
            type: integer
            format: int64
        - name: policyId
          in: path
          description: The policy ID (policy you want to probe)
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        description: >-
          The probe payload (refer to the documentation of the probe you want to
          use for the correct format).
        content:
          application/json:
            schema:
              type: string
      responses:
        '200':
          description: Probe executed successfully
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/reorderApiPlans:
    put:
      tags:
        - Organizations
      summary: Reorder API plans
      description: >-
        Reorder API plans, which affects the order they are displayed in the API
        Developer Portal.
      operationId: reorderApiPlans
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ApiPlanOrderDto'
      responses:
        '200':
          description: Reordering of plans was successful.
        '401':
          description: >-
            If invalid data is provided, such as plans that exist but have not
            been attached to the API
        '404':
          description: If the Organization, API or Api Version cannot be found
  /organizations/{organizationId}/apis/{apiId}/versions/{version}/reorderPolicies:
    post:
      tags:
        - Organizations
      summary: Re-Order API Policies
      operationId: reorderApiPolicies
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The API version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PolicyChainBean'
      responses:
        '204':
          description: If the re-ordering of Policies was successful.
        '404':
          description: If the API does not exist.
  /organizations/{organizationId}/clients/{clientId}/versions/{version}/reorderPolicies:
    post:
      tags:
        - Organizations
      summary: Re-Order Client Policies
      operationId: reorderClientPolicies
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: clientId
          in: path
          description: The Client ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Client version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PolicyChainBean'
      responses:
        '204':
          description: If the re-ordering of Policies was successful.
        '404':
          description: If the Client does not exist.
  /organizations/{organizationId}/plans/{planId}/versions/{version}/reorderPolicies:
    post:
      tags:
        - Organizations
      summary: Re-Order Plan Policies
      operationId: reorderPlanPolicies
      parameters:
        - name: organizationId
          in: path
          description: The Organization ID.
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID.
          required: true
          schema:
            type: string
        - name: version
          in: path
          description: The Plan version.
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PolicyChainBean'
      responses:
        '204':
          description: If the re-ordering of Policies was successful.
        '404':
          description: If the Plan does not exist.
  /organizations/{organizationId}/roles/{roleId}/{userId}:
    delete:
      tags:
        - Organizations
      summary: Revoke Single Membership
      operationId: revoke
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
        - name: roleId
          in: path
          description: The role ID.
          required: true
          schema:
            type: string
        - name: userId
          in: path
          description: The user ID.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the membership was successfully revoked.
  /organizations/{organizationId}/members/{userId}:
    delete:
      tags:
        - Organizations
      summary: Revoke All Memberships
      operationId: revokeAll
      parameters:
        - name: organizationId
          in: path
          description: The organization ID.
          required: true
          schema:
            type: string
        - name: userId
          in: path
          description: The user ID.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the user's memberships were successfully revoked.
        '404':
          description: If the user does not exist.
  /organizations/{organizationId}/apis/{apiId}/tags:
    put:
      tags:
        - Organizations
      summary: Tag an API
      operationId: tagApi
      parameters:
        - name: organizationId
          in: path
          description: Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: API ID
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/KeyValueTagDto'
      responses:
        '200':
          description: Tag was created successfully.
  /plugins:
    get:
      tags:
        - Plugins
      operationId: list_1
      responses:
        '200':
          description: If the list of plugins is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PluginSummaryBean'
    post:
      tags:
        - Plugins
      operationId: create_2
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewPluginBean'
      responses:
        '200':
          description: If the plugin was added successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PluginBean'
  /plugins/{pluginId}:
    get:
      tags:
        - Plugins
      operationId: get_2
      parameters:
        - name: pluginId
          in: path
          description: The plugin ID
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: If the plugin exists and is returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PluginBean'
    delete:
      tags:
        - Plugins
      operationId: delete_2
      parameters:
        - name: pluginId
          in: path
          description: The plugin ID
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '204':
          description: If the plugin was deleted successfully.
  /plugins/availablePlugins:
    get:
      tags:
        - Plugins
      operationId: getAvailablePlugins
      responses:
        '200':
          description: If the plugins are returned successfully.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PluginSummaryBean'
        '403':
          description: If the user is not an admin.
  /plugins/{pluginId}/policyDefs:
    get:
      tags:
        - Plugins
      operationId: getPolicyDefs
      parameters:
        - name: pluginId
          in: path
          description: The plugin ID
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: If the list of policy definitions is returned successfully.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PolicyDefinitionSummaryBean'
        '404':
          description: If the plugin does not exist.
  /plugins/{pluginId}/policyDefs/{policyDefId}/form:
    get:
      tags:
        - Plugins
      operationId: getPolicyForm
      parameters:
        - name: pluginId
          in: path
          description: The plugin ID
          required: true
          schema:
            type: integer
            format: int64
        - name: policyDefId
          in: path
          description: The policy definition ID
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the form is returned successfully.
          content:
            application/json:
              schema:
                type: string
        '404':
          description: If the form does not exist.
  /policyDefs:
    get:
      tags:
        - Policy Definitions
      operationId: list_2
      responses:
        '200':
          description: If the policy definition list is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PolicyDefinitionSummaryBean'
    post:
      tags:
        - Policy Definitions
      operationId: create_3
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PolicyDefinitionBean'
      responses:
        '200':
          description: If the policy definition is added successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PolicyDefinitionBean'
  /policyDefs/{policyDefinitionId}:
    get:
      tags:
        - Policy Definitions
      operationId: get_3
      parameters:
        - name: policyDefinitionId
          in: path
          description: The policy definition ID
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the policy definition is returned successfully.
    put:
      tags:
        - Policy Definitions
      operationId: update_2
      parameters:
        - name: policyDefinitionId
          in: path
          description: The policy definition ID
          required: true
          schema:
            type: string
      requestBody:
        content:
          '*/*':
            schema:
              $ref: '#/components/schemas/UpdatePolicyDefinitionBean'
      responses:
        '204':
          description: If the update was successful.
    delete:
      tags:
        - Policy Definitions
      operationId: delete_3
      parameters:
        - name: policyDefinitionId
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the policy definition is successfully deleted.
  /devportal/protected/organizations:
    post:
      tags:
        - Devportal
        - Experimental
      summary: Create home org for developer
      description: >-
        Create a 'home' organization on behalf of the portal user (they may not
        normally have permissions to do this themselves).
      operationId: createHomeOrgForDeveloper_1
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewOrganizationBean'
      responses:
        default:
          description: default response
          content:
            application/json: {}
  /devportal/protected/organizations/{orgId}/apis/{apiId}/versions/{apiVersion}/definition:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get an API Definition (schema) for an API Version
      operationId: getApiDefinition_3
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
        - name: apiVersion
          in: path
          description: The API Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json: {}
            application/wsdl+xml: {}
            application/x-yaml: {}
  /devportal/protected/organizations/{orgId}/apis/{apiId}/versions/{apiVersion}:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get a specific API Version
      operationId: getApiVersion_2
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
        - name: apiVersion
          in: path
          description: The API Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiVersionBeanDto'
  /devportal/protected/organizations/{orgId}/apis/{apiId}/versions/{apiVersion}/endpoint:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get endpoint information for an API Version
      operationId: getApiVersionEndpointInfo_2
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
        - name: apiVersion
          in: path
          description: The API Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiVersionEndpointSummaryBean'
  /devportal/protected/organizations/{orgId}/apis/{apiId}/versions/{apiVersion}/plans:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get all Plans for an API Version
      operationId: getApiVersionPlans_2
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
        - name: apiVersion
          in: path
          description: The API Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/DeveloperApiPlanSummaryDto'
  /devportal/protected/apis/featured:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get all featured APIs
      operationId: getFeaturedApis_1
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanApiSummaryBean'
  /devportal/protected/organizations/{orgId}/plans/{planId}/versions/{planVersion}/policies/{policyId}:
    get:
      tags:
        - Devportal
        - Experimental
      summary: Get a specific policy on a plan version
      operationId: getPlanPolicy_2
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID
          required: true
          schema:
            type: string
        - name: planVersion
          in: path
          description: The Plan Version
          required: true
          schema:
            type: string
        - name: policyId
          in: path
          description: The Policy ID
          required: true
          schema:
            type: integer
            format: int64
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PolicyBean'
  /devportal/protected/organizations/{orgId}/apis/{apiId}/versions/{apiVersion}/policies:
    get:
      tags:
        - Devportal
        - Experimental
      summary: List all policies on an API Version
      operationId: listApiPolicies_2
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
        - name: apiVersion
          in: path
          description: The API Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ApiVersionPolicySummaryDto'
  /devportal/protected/organizations/{orgId}/apis/{apiId}/versions:
    get:
      tags:
        - Devportal
        - Experimental
      summary: List all API Versions within an organization
      operationId: listApiVersions_2
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: apiId
          in: path
          description: The API ID
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ApiVersionSummaryBean'
  /devportal/protected/organizations/{orgId}/plans/{planId}/versions/{planVersion}/policies:
    get:
      tags:
        - Devportal
        - Experimental
      summary: List all policies on a specific Plan Version
      operationId: listPlanPolicies_2
      parameters:
        - name: orgId
          in: path
          description: The Organization ID
          required: true
          schema:
            type: string
        - name: planId
          in: path
          description: The Plan ID
          required: true
          schema:
            type: string
        - name: planVersion
          in: path
          description: The Plan Version
          required: true
          schema:
            type: string
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PolicySummaryBean'
  /devportal/protected/search/apis:
    post:
      tags:
        - Devportal
        - Experimental
      summary: Search Apiman APIs
      operationId: searchApis_1
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SearchCriteriaBean'
      responses:
        default:
          description: default response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanApiSummaryBean'
  /roles:
    get:
      tags:
        - Roles
      operationId: list_3
      responses:
        '200':
          description: If the role list is returned successfully.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/RoleBean'
    post:
      tags:
        - Roles
      operationId: create_4
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewRoleBean'
      responses:
        '200':
          description: If the role is created successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RoleBean'
  /roles/{roleId}:
    get:
      tags:
        - Roles
      operationId: get_4
      parameters:
        - name: roleId
          in: path
          description: The Role ID
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the role is returned successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RoleBean'
    put:
      tags:
        - Roles
      operationId: update_3
      parameters:
        - name: roleId
          in: path
          description: The Role ID
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateRoleBean'
      responses:
        '204':
          description: If the role is updated successfully.
    delete:
      tags:
        - Roles
      operationId: delete_4
      parameters:
        - name: roleId
          in: path
          description: The Role ID
          required: true
          schema:
            type: string
      responses:
        '204':
          description: If the role is deleted.
  /search/apiCatalog/namespaces:
    get:
      tags:
        - Search
      operationId: getApiNamespaces
      responses:
        '200':
          description: If the namespaces were successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ApiNamespaceBean'
  /search/apiCatalog/entries:
    post:
      tags:
        - Search
      operationId: searchApiCatalog
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SearchCriteriaBean'
      responses:
        '200':
          description: If the search is successful.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanAvailableApiBean'
  /search/apis:
    post:
      tags:
        - Search
      operationId: searchApis_2
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SearchCriteriaBean'
      responses:
        '200':
          description: If the search is successful.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanApiSummaryBean'
  /search/clients:
    post:
      tags:
        - Search
      operationId: searchClients
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SearchCriteriaBean'
      responses:
        '200':
          description: If the search is successful.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanClientSummaryBean'
  /search/organizations:
    post:
      tags:
        - Search
      operationId: searchOrgs
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SearchCriteriaBean'
      responses:
        '200':
          description: If the search is successful.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanOrganizationSummaryBean'
  /search/roles:
    post:
      tags:
        - Search
      operationId: searchRoles
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SearchCriteriaBean'
      responses:
        '200':
          description: If the search completes successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanRoleBean'
  /search/users:
    post:
      tags:
        - Search
      operationId: searchUsers
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SearchCriteriaBean'
      responses:
        '200':
          description: If the search is successful.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanUserSearchResult'
  /system/export:
    get:
      tags:
        - System
      operationId: exportData
      parameters:
        - name: download
          in: query
          description: The download ID
          schema:
            type: string
      responses:
        '200':
          description: On successful export
  /system/status:
    get:
      tags:
        - System
      operationId: getStatus
      responses:
        '200':
          description: Service is available.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SystemStatusBean'
  /system/import:
    post:
      tags:
        - System
      operationId: importData
      responses:
        '200':
          description: On successful import
  /users/{userId}/notifications/filters:
    post:
      tags:
        - Users
      operationId: createNotificationFilter
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateNotificationFilterDto'
      responses:
        default:
          description: default response
          content:
            application/json: {}
  /users/{userId}:
    get:
      tags:
        - Users
      operationId: get_5
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the user exists and information is returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserDto'
    put:
      tags:
        - Users
      operationId: update_4
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateUserBean'
      responses:
        '204':
          description: If the user information is successfully updated.
  /users/{userId}/activity:
    get:
      tags:
        - Users
      operationId: getActivity
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
        - name: page
          in: query
          schema:
            type: integer
            format: int32
        - name: count
          in: query
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: If the activity is successfully returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanAuditEntryBean'
  /users/{userId}/apiorgs:
    get:
      tags:
        - Users
      operationId: getApiOrganizations
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the organizations are successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/OrganizationSummaryBean'
  /users/{userId}/apis:
    get:
      tags:
        - Users
      operationId: getApis
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the API list is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ApiSummaryBean'
  /users/{userId}/clientorgs:
    get:
      tags:
        - Users
      operationId: getClientOrganizations
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the organizations are successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/OrganizationSummaryBean'
  /users/{userId}/viewable-clients:
    get:
      tags:
        - Users
      operationId: getClients
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the client list is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ClientSummaryBean'
  /users/{userId}/editable-clients:
    get:
      tags:
        - Users
      operationId: getEditableClients
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the client list is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ClientSummaryBean'
  /users/currentuser/info:
    get:
      tags:
        - Users
      operationId: getInfo
      responses:
        '200':
          description: If the information is correctly returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CurrentUserBean'
  /users/{userId}/notifications:
    put:
      tags:
        - Users
      operationId: markNotifications
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NotificationActionDto'
        required: true
      responses:
        '202':
          description: If the command to mark the user's notification was accepted
    post:
      tags:
        - Users
      operationId: getNotificationsForUser
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NotificationCriteriaBean'
      responses:
        '200':
          description: If the notifications are successfully retrieved.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResultsBeanNotificationDtoObject'
    head:
      tags:
        - Users
      operationId: getNotificationCountForUser
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
        - name: includeDismissed
          in: query
          schema:
            type: boolean
            default: false
      responses:
        '204':
          description: If user's notification metadata is successfully retrieved
  /users/{userId}/organizations:
    get:
      tags:
        - Users
      operationId: getOrganizations
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the organization list is successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/OrganizationSummaryBean'
  /users/{userId}/permissions:
    get:
      tags:
        - Users
      operationId: getPermissionsForUser
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the permissions are successfully retrieved.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserPermissionsBean'
  /users/{userId}/planorgs:
    get:
      tags:
        - Users
      operationId: getPlanOrganizations
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: If the organizations are successfully returned.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/OrganizationSummaryBean'
components:
  schemas:
    ContractActionDto:
      type: object
      properties:
        contractId:
          type: integer
          format: int64
        status:
          type: string
          enum:
            - AwaitingApproval
            - Created
            - Rejected
        rejectionReason:
          type: string
        autoPromote:
          type: boolean
    ActionBean:
      type: object
      properties:
        type:
          type: string
          enum:
            - publishAPI
            - retireAPI
            - registerClient
            - unregisterClient
            - lockPlan
        organizationId:
          type: string
        entityId:
          type: string
        entityVersion:
          type: string
    InputPart:
      type: object
      properties:
        contentTypeFromMessage:
          type: boolean
        bodyAsString:
          type: string
        mediaType:
          type: object
          properties:
            type:
              type: string
            subtype:
              type: string
            parameters:
              type: object
              additionalProperties:
                type: string
            wildcardType:
              type: boolean
            wildcardSubtype:
              type: boolean
        headers:
          type: object
          additionalProperties:
            type: array
            items:
              type: string
    MultipartFormDataInput:
      type: object
      properties:
        formData:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/InputPart'
        formDataMap:
          type: object
          additionalProperties:
            type: array
            items:
              $ref: '#/components/schemas/InputPart'
        preamble:
          type: string
        parts:
          type: array
          items:
            $ref: '#/components/schemas/InputPart'
    NewOrganizationBean:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
    ApiBeanDto:
      type: object
      properties:
        organization:
          $ref: '#/components/schemas/OrganizationBean'
        id:
          type: string
        name:
          type: string
        image:
          type: string
        description:
          type: string
        tags:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/KeyValueTag'
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        numPublished:
          type: integer
          format: int32
    ApiGatewayBean:
      type: object
      properties:
        gatewayId:
          type: string
    ApiPlanBeanDto:
      required:
        - planId
        - version
      type: object
      properties:
        planId:
          type: string
        version:
          type: string
        requiresApproval:
          type: boolean
        discoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
    ApiVersionBeanDto:
      required:
        - api
        - createdBy
        - createdOn
        - definitionType
        - endpointContentType
        - endpointType
        - id
        - modifiedBy
        - modifiedOn
        - publicDiscoverability
        - publishedOn
        - retiredOn
        - status
        - version
      type: object
      properties:
        id:
          type: integer
          format: int64
        api:
          $ref: '#/components/schemas/ApiBeanDto'
        version:
          type: string
        status:
          type: string
          enum:
            - Created
            - Ready
            - Published
            - Retired
        endpoint:
          type: string
        endpointType:
          type: string
          enum:
            - rest
            - soap
        endpointContentType:
          type: string
          enum:
            - json
            - xml
        endpointProperties:
          type: object
          additionalProperties:
            type: string
        gateways:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/ApiGatewayBean'
        publicAPI:
          type: boolean
        publicDiscoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
        plans:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/ApiPlanBeanDto'
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        modifiedBy:
          type: string
        modifiedOn:
          type: string
          format: date-time
        publishedOn:
          type: string
          format: date-time
        retiredOn:
          type: string
          format: date-time
        definitionType:
          type: string
          enum:
            - None
            - SwaggerJSON
            - SwaggerYAML
            - WSDL
            - WADL
            - RAML
            - External
        parsePayload:
          type: boolean
        disableKeysStrip:
          type: boolean
        definitionUrl:
          type: string
        extendedDescription:
          type: string
    KeyValueTag:
      type: object
      properties:
        id:
          type: integer
          format: int64
        key:
          type: string
        value:
          type: string
    OrganizationBean:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        modifiedBy:
          type: string
        modifiedOn:
          type: string
          format: date-time
    ApiVersionEndpointSummaryBean:
      type: object
      properties:
        managedEndpoint:
          type: string
    DeveloperApiPlanSummaryDto:
      type: object
      properties:
        planId:
          type: string
        planName:
          type: string
        planDescription:
          type: string
        version:
          type: string
        requiresApproval:
          type: boolean
        discoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
        planPolicies:
          type: array
          items:
            $ref: '#/components/schemas/PolicyBean'
    PolicyBean:
      type: object
      properties:
        id:
          type: integer
          format: int64
        type:
          type: string
          description: The type of policy
          enum:
            - Client
            - Plan
            - Api
        organizationId:
          type: string
        entityId:
          type: string
        entityVersion:
          type: string
        name:
          type: string
        description:
          type: string
        configuration:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        modifiedBy:
          type: string
        modifiedOn:
          type: string
          format: date-time
        definition:
          $ref: '#/components/schemas/PolicyDefinitionBean'
        orderIndex:
          type: integer
          format: int32
    PolicyDefinitionBean:
      type: object
      properties:
        id:
          type: string
        policyImpl:
          type: string
        name:
          type: string
        description:
          type: string
        icon:
          type: string
        templates:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/PolicyDefinitionTemplateBean'
        pluginId:
          type: integer
          format: int64
        formType:
          type: string
          enum:
            - Default
            - JsonSchema
        form:
          type: string
        deleted:
          type: boolean
    PolicyDefinitionTemplateBean:
      type: object
      properties:
        language:
          type: string
        template:
          type: string
    ApiSummaryBean:
      type: object
      properties:
        organizationId:
          type: string
        organizationName:
          type: string
        image:
          type: string
        id:
          type: string
        name:
          type: string
        description:
          type: string
        createdOn:
          type: string
          format: date-time
        tags:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/KeyValueTagDto'
    KeyValueTagDto:
      required:
        - key
      type: object
      properties:
        key:
          type: string
        value:
          type: string
      description: Key value tag pair
    SearchResultsBeanApiSummaryBean:
      type: object
      properties:
        beans:
          type: array
          items:
            $ref: '#/components/schemas/ApiSummaryBean'
        totalSize:
          type: integer
          format: int32
    ApiVersionPolicySummaryDto:
      type: object
      properties:
        policyDefinitionId:
          type: string
        id:
          type: integer
          format: int64
        name:
          type: string
        description:
          type: string
        icon:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        policyConfiguration:
          type: string
    ApiVersionSummaryBean:
      type: object
      properties:
        organizationId:
          type: string
        organizationName:
          type: string
        id:
          type: string
        name:
          type: string
        description:
          type: string
        extendedDescription:
          type: string
        status:
          type: string
          enum:
            - Created
            - Ready
            - Published
            - Retired
        version:
          type: string
        publicAPI:
          type: boolean
        publicDiscoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
        apiTags:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/KeyValueTagDto'
    PolicySummaryBean:
      type: object
      properties:
        policyDefinitionId:
          type: string
        id:
          type: integer
          format: int64
        name:
          type: string
        description:
          type: string
        icon:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
    OrderByBean:
      type: object
      properties:
        ascending:
          type: boolean
        name:
          type: string
    PagingBean:
      type: object
      properties:
        page:
          type: integer
          format: int32
        pageSize:
          type: integer
          format: int32
    SearchCriteriaBean:
      type: object
      properties:
        filters:
          type: array
          items:
            $ref: '#/components/schemas/SearchCriteriaFilterBean'
        orderBy:
          $ref: '#/components/schemas/OrderByBean'
        paging:
          $ref: '#/components/schemas/PagingBean'
        pageSize:
          $ref: '#/components/schemas/SearchCriteriaBean'
        page:
          $ref: '#/components/schemas/SearchCriteriaBean'
    SearchCriteriaFilterBean:
      type: object
      properties:
        name:
          type: string
        value:
          type: string
        operator:
          type: string
          enum:
            - bool_eq
            - eq
            - neq
            - gt
            - gte
            - lt
            - lte
            - like
    DeveloperBean:
      type: object
      properties:
        id:
          type: string
        clients:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/DeveloperMappingBean'
    DeveloperMappingBean:
      type: object
      properties:
        clientId:
          type: string
        organizationId:
          type: string
    ApiBean:
      type: object
      properties:
        organization:
          $ref: '#/components/schemas/OrganizationBean'
        id:
          type: string
        name:
          type: string
        image:
          type: string
        description:
          type: string
        tags:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/KeyValueTag'
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        numPublished:
          type: integer
          format: int32
    DeveloperApiVersionBeanDto:
      type: object
      properties:
        id:
          type: integer
          format: int64
        api:
          $ref: '#/components/schemas/ApiBean'
        status:
          type: string
          enum:
            - Created
            - Ready
            - Published
            - Retired
        endpoint:
          type: string
        endpointType:
          type: string
          enum:
            - rest
            - soap
        endpointContentType:
          type: string
          enum:
            - json
            - xml
        endpointProperties:
          type: object
          additionalProperties:
            type: string
        gateways:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/ApiGatewayBean'
        publicAPI:
          type: boolean
        publicDiscoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
        plans:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/ApiPlanBeanDto'
        version:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        modifiedBy:
          type: string
        modifiedOn:
          type: string
          format: date-time
        publishedOn:
          type: string
          format: date-time
        retiredOn:
          type: string
          format: date-time
        definitionType:
          type: string
          enum:
            - None
            - SwaggerJSON
            - SwaggerYAML
            - WSDL
            - WADL
            - RAML
            - External
        parsePayload:
          type: boolean
        disableKeysStrip:
          type: boolean
        definitionUrl:
          type: string
        extendedDescription:
          type: string
    ContractSummaryBean:
      type: object
      properties:
        contractId:
          type: integer
          format: int64
        clientOrganizationId:
          type: string
        clientOrganizationName:
          type: string
        clientId:
          type: string
        clientName:
          type: string
        clientVersion:
          type: string
        apiOrganizationId:
          type: string
        apiOrganizationName:
          type: string
        apiId:
          type: string
        apiName:
          type: string
        apiVersion:
          type: string
        apiDescription:
          type: string
        planName:
          type: string
        planId:
          type: string
        planVersion:
          type: string
        createdOn:
          type: string
          format: date-time
        status:
          type: string
          enum:
            - AwaitingApproval
            - Created
            - Rejected
    ClientVersionSummaryBean:
      type: object
      properties:
        organizationId:
          type: string
        organizationName:
          type: string
        id:
          type: string
        name:
          type: string
        description:
          type: string
        status:
          type: string
          enum:
            - Created
            - AwaitingApproval
            - Ready
            - Registered
            - Retired
        version:
          type: string
        apiKey:
          type: string
    ApiDefinitionBean:
      type: object
      properties:
        id:
          type: integer
          format: int64
        apiVersion:
          $ref: '#/components/schemas/ApiVersionBean'
        data:
          type: array
          items:
            type: string
            format: byte
    ApiPlanBean:
      type: object
      properties:
        planId:
          type: string
        version:
          type: string
        requiresApproval:
          type: boolean
        discoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
    ApiVersionBean:
      type: object
      properties:
        id:
          type: integer
          format: int64
        api:
          $ref: '#/components/schemas/ApiBean'
        status:
          type: string
          enum:
            - Created
            - Ready
            - Published
            - Retired
        endpoint:
          type: string
        endpointType:
          type: string
          enum:
            - rest
            - soap
        endpointContentType:
          type: string
          enum:
            - json
            - xml
        endpointProperties:
          type: object
          additionalProperties:
            type: string
        gateways:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/ApiGatewayBean'
        publicAPI:
          type: boolean
        discoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
        plans:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/ApiPlanBean'
        version:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        modifiedBy:
          type: string
        modifiedOn:
          type: string
          format: date-time
        publishedOn:
          type: string
          format: date-time
        retiredOn:
          type: string
          format: date-time
        definitionType:
          type: string
          enum:
            - None
            - SwaggerJSON
            - SwaggerYAML
            - WSDL
            - WADL
            - RAML
            - External
        parsePayload:
          type: boolean
        disableKeysStrip:
          type: boolean
        definitionUrl:
          type: string
        extendedDescription:
          type: string
        definition:
          $ref: '#/components/schemas/ApiDefinitionBean'
    UpdateDeveloperBean:
      type: object
      properties:
        clients:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/DeveloperMappingBean'
    NewAccountCreatedDto:
      type: object
      properties:
        time:
          type: string
          format: date-time
        userId:
          type: string
        username:
          type: string
        emailAddress:
          type: string
        firstName:
          type: string
        surname:
          type: string
        roles:
          uniqueItems: true
          type: array
          items:
            type: string
        attributes:
          type: object
          additionalProperties:
            type: array
            items:
              type: string
        approvalRequired:
          type: boolean
    GatewayBean:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        modifiedBy:
          type: string
        modifiedOn:
          type: string
          format: date-time
        type:
          type: string
          enum:
            - REST
        configuration:
          type: string
    NewGatewayBean:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        type:
          type: string
          enum:
            - REST
        configuration:
          type: string
    GatewayEndpointSummaryBean:
      type: object
      properties:
        endpoint:
          type: string
    GatewaySummaryBean:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        type:
          type: string
          enum:
            - REST
    GatewayTestResultBean:
      type: object
      properties:
        success:
          type: boolean
        detail:
          type: string
    UpdateGatewayBean:
      type: object
      properties:
        description:
          type: string
        type:
          type: string
          enum:
            - REST
        configuration:
          type: string
    NewApiBean:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        extendedDescription:
          type: string
        initialVersion:
          type: string
        endpoint:
          type: string
        endpointType:
          type: string
          enum:
            - rest
            - soap
        endpointContentType:
          type: string
          enum:
            - json
            - xml
        publicAPI:
          type: boolean
        parsePayload:
          type: boolean
        disableKeysStrip:
          type: boolean
        plans:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/ApiPlanBean'
        definitionUrl:
          type: string
        definitionType:
          type: string
          enum:
            - None
            - SwaggerJSON
            - SwaggerYAML
            - WSDL
            - WADL
            - RAML
            - External
        tags:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/KeyValueTagDto'
    NewPolicyBean:
      type: object
      properties:
        definitionId:
          type: string
        configuration:
          type: string
      description: Payload for creating a new policy for a Plan, API, or Client
    NewApiVersionBean:
      required:
        - version
      type: object
      properties:
        version:
          type: string
        clone:
          type: boolean
        cloneVersion:
          type: string
        endpoint:
          type: string
        endpointType:
          type: string
          enum:
            - rest
            - soap
        endpointContentType:
          type: string
          enum:
            - json
            - xml
        publicAPI:
          type: boolean
        parsePayload:
          type: boolean
        disableKeysStrip:
          type: boolean
        plans:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/ApiPlanBean'
        definitionUrl:
          type: string
        definitionType:
          type: string
          enum:
            - None
            - SwaggerJSON
            - SwaggerYAML
            - WSDL
            - WADL
            - RAML
            - External
        extendedDescription:
          type: string
      description: Initial information to create a new API version.
    ClientBean:
      type: object
      properties:
        organization:
          $ref: '#/components/schemas/OrganizationBean'
        id:
          type: string
        name:
          type: string
        image:
          type: string
        description:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
    NewClientBean:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        initialVersion:
          type: string
    ClientVersionBean:
      type: object
      properties:
        id:
          type: integer
          format: int64
        client:
          $ref: '#/components/schemas/ClientBean'
        status:
          type: string
          enum:
            - Created
            - AwaitingApproval
            - Ready
            - Registered
            - Retired
        version:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        modifiedBy:
          type: string
        modifiedOn:
          type: string
          format: date-time
        publishedOn:
          type: string
          format: date-time
        retiredOn:
          type: string
          format: date-time
        apikey:
          type: string
    NewClientVersionBean:
      type: object
      properties:
        version:
          type: string
        clone:
          type: boolean
        cloneVersion:
          type: string
        apiKey:
          type: string
    ContractBean:
      type: object
      properties:
        id:
          type: integer
          format: int64
        client:
          $ref: '#/components/schemas/ClientVersionBean'
        api:
          $ref: '#/components/schemas/ApiVersionBean'
        plan:
          $ref: '#/components/schemas/PlanVersionBean'
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        status:
          type: string
          enum:
            - AwaitingApproval
            - Created
            - Rejected
    PlanBean:
      type: object
      properties:
        organization:
          $ref: '#/components/schemas/OrganizationBean'
        id:
          type: string
        name:
          type: string
        description:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
    PlanVersionBean:
      type: object
      properties:
        id:
          type: integer
          format: int64
        plan:
          $ref: '#/components/schemas/PlanBean'
        status:
          type: string
          enum:
            - Created
            - Ready
            - Locked
        version:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        modifiedBy:
          type: string
        modifiedOn:
          type: string
          format: date-time
        lockedOn:
          type: string
          format: date-time
    NewContractBean:
      type: object
      properties:
        apiOrgId:
          type: string
        apiId:
          type: string
        apiVersion:
          type: string
        planId:
          type: string
      description: Required information to create a new Contract.
    NewPlanBean:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        initialVersion:
          type: string
    NewPlanVersionBean:
      type: object
      properties:
        version:
          type: string
        clone:
          type: boolean
        cloneVersion:
          type: string
    AuditEntryBean:
      type: object
      properties:
        id:
          type: integer
          format: int64
        who:
          type: string
        organizationId:
          type: string
        entityType:
          type: string
          enum:
            - Organization
            - Client
            - Plan
            - Api
        entityId:
          type: string
        entityVersion:
          type: string
        createdOn:
          type: string
          format: date-time
        what:
          type: string
          enum:
            - Create
            - Update
            - Delete
            - Clone
            - Grant
            - Revoke
            - Publish
            - Retire
            - Register
            - Unregister
            - AddPolicy
            - RemovePolicy
            - UpdatePolicy
            - ReorderPolicies
            - CreateContract
            - BreakContract
            - Lock
            - UpdateDefinition
            - DeleteDefinition
        data:
          type: string
    SearchResultsBeanAuditEntryBean:
      type: object
      properties:
        beans:
          type: array
          items:
            $ref: '#/components/schemas/AuditEntryBean'
        totalSize:
          type: integer
          format: int32
    PolicyChainBean:
      type: object
      properties:
        policies:
          type: array
          items:
            $ref: '#/components/schemas/PolicySummaryBean'
      description: >-
        Models an ordered list of policies that would be applied if an API were
        invoked via a particular plan
    ApiPlanSummaryBean:
      type: object
      properties:
        planId:
          type: string
        planName:
          type: string
        planDescription:
          type: string
        version:
          type: string
        discoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
        requiresApproval:
          type: boolean
    ApiVersionStatusBean:
      type: object
      properties:
        status:
          type: string
          enum:
            - Created
            - Ready
            - Published
            - Retired
        items:
          type: array
          items:
            $ref: '#/components/schemas/StatusItemBean'
    StatusItemBean:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        done:
          type: boolean
        optional:
          type: boolean
        remediation:
          type: string
    ApiKeyBean:
      type: object
      properties:
        apiKey:
          type: string
    ClientUsagePerApiBean:
      type: object
      properties:
        data:
          type: object
          additionalProperties:
            type: integer
            format: int64
    ResponseStatsDataPoint:
      type: object
      properties:
        label:
          type: string
        total:
          type: integer
          format: int64
        failures:
          type: integer
          format: int64
        errors:
          type: integer
          format: int64
    ResponseStatsHistogramBean:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/ResponseStatsDataPoint'
    ResponseStatsPerClientBean:
      type: object
      properties:
        data:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ResponseStatsDataPoint'
    ResponseStatsPerPlanBean:
      type: object
      properties:
        data:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/ResponseStatsDataPoint'
    ResponseStatsSummaryBean:
      type: object
      properties:
        total:
          type: integer
          format: int64
        failures:
          type: integer
          format: int64
        errors:
          type: integer
          format: int64
    UsageDataPoint:
      type: object
      properties:
        label:
          type: string
        count:
          type: integer
          format: int64
    UsageHistogramBean:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/UsageDataPoint'
    UsagePerClientBean:
      type: object
      properties:
        data:
          type: object
          additionalProperties:
            type: integer
            format: int64
    UsagePerPlanBean:
      type: object
      properties:
        data:
          type: object
          additionalProperties:
            type: integer
            format: int64
    GrantRolesBean:
      type: object
      properties:
        userId:
          type: string
        roleIds:
          uniqueItems: true
          type: array
          items:
            type: string
    ClientSummaryBean:
      type: object
      properties:
        organizationId:
          type: string
        organizationName:
          type: string
        image:
          type: string
        id:
          type: string
        name:
          type: string
        description:
          type: string
        numContracts:
          type: integer
          format: int32
    MemberBean:
      type: object
      properties:
        userId:
          type: string
        userName:
          type: string
        email:
          type: string
        joinedOn:
          type: string
          format: date-time
        roles:
          type: array
          items:
            $ref: '#/components/schemas/MemberRoleBean'
    MemberRoleBean:
      type: object
      properties:
        roleId:
          type: string
        roleName:
          type: string
    PlanVersionSummaryBean:
      type: object
      properties:
        organizationId:
          type: string
        organizationName:
          type: string
        id:
          type: string
        name:
          type: string
        description:
          type: string
        status:
          type: string
          enum:
            - Created
            - Ready
            - Locked
        version:
          type: string
    PlanSummaryBean:
      type: object
      properties:
        organizationId:
          type: string
        organizationName:
          type: string
        id:
          type: string
        name:
          type: string
        description:
          type: string
    ApiPlanOrderDto:
      type: object
      properties:
        order:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/ApiPlanOrderEntryDto'
    ApiPlanOrderEntryDto:
      required:
        - apiVersionId
        - planId
        - version
      type: object
      properties:
        apiVersionId:
          type: integer
          format: int64
        planId:
          type: string
        version:
          type: string
    UpdateApiBean:
      type: object
      properties:
        description:
          type: string
        image:
          type: string
        tags:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/KeyValueTagDto'
        publicDiscoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
    NewApiDefinitionBean:
      type: object
      properties:
        definitionUrl:
          type: string
        definitionType:
          type: string
          enum:
            - None
            - SwaggerJSON
            - SwaggerYAML
            - WSDL
            - WADL
            - RAML
            - External
    UpdatePolicyBean:
      type: object
      properties:
        configuration:
          type: string
      description: Update a policy
    UpdateApiPlanDto:
      required:
        - planId
        - version
      type: object
      properties:
        planId:
          type: string
        version:
          type: string
        requiresApproval:
          type: boolean
        discoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
    UpdateApiVersionBean:
      type: object
      properties:
        endpoint:
          type: string
        endpointType:
          type: string
          enum:
            - rest
            - soap
        endpointContentType:
          type: string
          enum:
            - json
            - xml
        endpointProperties:
          type: object
          additionalProperties:
            type: string
        gateways:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/ApiGatewayBean'
        parsePayload:
          type: boolean
        publicAPI:
          type: boolean
        disableKeysStrip:
          type: boolean
        plans:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/UpdateApiPlanDto'
        extendedDescription:
          type: string
        publicDiscoverability:
          type: string
          enum:
            - PORTAL
            - ANONYMOUS
            - FULL_PLATFORM_MEMBERS
            - ORG_MEMBERS
    UpdateClientBean:
      type: object
      properties:
        description:
          type: string
    UpdateOrganizationBean:
      type: object
      properties:
        description:
          type: string
    UpdatePlanBean:
      type: object
      properties:
        description:
          type: string
    PluginBean:
      type: object
      properties:
        id:
          type: integer
          format: int64
        groupId:
          type: string
        artifactId:
          type: string
        version:
          type: string
        classifier:
          type: string
        type:
          type: string
        name:
          type: string
        description:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        deleted:
          type: boolean
    NewPluginBean:
      type: object
      properties:
        groupId:
          type: string
        artifactId:
          type: string
        version:
          type: string
        classifier:
          type: string
        type:
          type: string
        name:
          type: string
        description:
          type: string
        upgrade:
          type: boolean
    PluginSummaryBean:
      type: object
      properties:
        id:
          type: integer
          format: int64
        groupId:
          type: string
        artifactId:
          type: string
        version:
          type: string
        classifier:
          type: string
        type:
          type: string
        name:
          type: string
        description:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
    PolicyDefinitionSummaryBean:
      type: object
      properties:
        id:
          type: string
        policyImpl:
          type: string
        name:
          type: string
        description:
          type: string
        icon:
          type: string
        formType:
          type: string
          enum:
            - Default
            - JsonSchema
        pluginId:
          type: integer
          format: int64
    UpdatePolicyDefinitionBean:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        icon:
          type: string
      description: Update a new policy definition
    RoleBean:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        createdBy:
          type: string
        createdOn:
          type: string
          format: date-time
        autoGrant:
          type: boolean
        permissions:
          uniqueItems: true
          type: array
          items:
            type: string
            enum:
              - orgView
              - orgEdit
              - orgAdmin
              - apiView
              - apiEdit
              - apiAdmin
              - clientView
              - clientEdit
              - clientAdmin
              - planView
              - planEdit
              - planAdmin
    NewRoleBean:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        autoGrant:
          type: boolean
        permissions:
          uniqueItems: true
          type: array
          items:
            type: string
            enum:
              - orgView
              - orgEdit
              - orgAdmin
              - apiView
              - apiEdit
              - apiAdmin
              - clientView
              - clientEdit
              - clientAdmin
              - planView
              - planEdit
              - planAdmin
    UpdateRoleBean:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        autoGrant:
          type: boolean
        permissions:
          uniqueItems: true
          type: array
          items:
            type: string
            enum:
              - orgView
              - orgEdit
              - orgAdmin
              - apiView
              - apiEdit
              - apiAdmin
              - clientView
              - clientEdit
              - clientAdmin
              - planView
              - planEdit
              - planAdmin
    ApiNamespaceBean:
      type: object
      properties:
        name:
          type: string
        ownedByUser:
          type: boolean
        current:
          type: boolean
    AvailableApiBean:
      type: object
      properties:
        id:
          type: string
        icon:
          type: string
        endpoint:
          type: string
        routeEndpoint:
          type: string
        endpointType:
          type: string
          enum:
            - rest
            - soap
        name:
          type: string
        description:
          type: string
        definitionUrl:
          type: string
        routeDefinitionUrl:
          type: string
        definitionType:
          type: string
          enum:
            - None
            - SwaggerJSON
            - SwaggerYAML
            - WSDL
            - WADL
            - RAML
            - External
        namespace:
          type: string
        tags:
          uniqueItems: true
          type: array
          items:
            type: string
        internal:
          type: boolean
    SearchResultsBeanAvailableApiBean:
      type: object
      properties:
        beans:
          type: array
          items:
            $ref: '#/components/schemas/AvailableApiBean'
        totalSize:
          type: integer
          format: int32
    SearchResultsBeanClientSummaryBean:
      type: object
      properties:
        beans:
          type: array
          items:
            $ref: '#/components/schemas/ClientSummaryBean'
        totalSize:
          type: integer
          format: int32
    OrganizationSummaryBean:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        numClients:
          type: integer
          format: int32
        numApis:
          type: integer
          format: int32
        numMembers:
          type: integer
          format: int32
    SearchResultsBeanOrganizationSummaryBean:
      type: object
      properties:
        beans:
          type: array
          items:
            $ref: '#/components/schemas/OrganizationSummaryBean'
        totalSize:
          type: integer
          format: int32
    SearchResultsBeanRoleBean:
      type: object
      properties:
        beans:
          type: array
          items:
            $ref: '#/components/schemas/RoleBean'
        totalSize:
          type: integer
          format: int32
    SearchResultsBeanUserSearchResult:
      type: object
      properties:
        beans:
          type: array
          items:
            $ref: '#/components/schemas/UserSearchResult'
        totalSize:
          type: integer
          format: int32
    UserSearchResult:
      type: object
      properties:
        username:
          type: string
        fullName:
          type: string
    SystemStatusBean:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        moreInfo:
          type: string
        version:
          type: string
        builtOn:
          type: string
        up:
          type: boolean
    CreateNotificationFilterDto:
      type: object
      properties:
        source:
          type: string
        notificationType:
          type: string
          enum:
            - WEB
            - EMAIL
        expression:
          type: string
        enabled:
          type: boolean
        message:
          type: string
    UserDto:
      required:
        - email
        - fullName
        - joinedOn
        - locale
        - username
      type: object
      properties:
        username:
          type: string
        fullName:
          type: string
        email:
          type: string
        joinedOn:
          type: string
          format: date-time
        locale:
          type: object
          properties:
            language:
              type: string
            displayName:
              type: string
            script:
              type: string
            country:
              type: string
            variant:
              type: string
            extensionKeys:
              uniqueItems: true
              type: array
              items:
                type: string
            unicodeLocaleAttributes:
              uniqueItems: true
              type: array
              items:
                type: string
            unicodeLocaleKeys:
              uniqueItems: true
              type: array
              items:
                type: string
            iso3Language:
              type: string
            iso3Country:
              type: string
            displayLanguage:
              type: string
            displayScript:
              type: string
            displayCountry:
              type: string
            displayVariant:
              type: string
        admin:
          type: boolean
    CurrentUserBean:
      type: object
      properties:
        username:
          type: string
        fullName:
          type: string
        email:
          type: string
        joinedOn:
          type: string
          format: date-time
        locale:
          type: object
          properties:
            language:
              type: string
            displayName:
              type: string
            script:
              type: string
            country:
              type: string
            variant:
              type: string
            extensionKeys:
              uniqueItems: true
              type: array
              items:
                type: string
            unicodeLocaleAttributes:
              uniqueItems: true
              type: array
              items:
                type: string
            unicodeLocaleKeys:
              uniqueItems: true
              type: array
              items:
                type: string
            iso3Language:
              type: string
            iso3Country:
              type: string
            displayLanguage:
              type: string
            displayScript:
              type: string
            displayCountry:
              type: string
            displayVariant:
              type: string
        notificationPreferences:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/NotificationPreferenceEntity'
        admin:
          type: boolean
        permissions:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/PermissionBean'
    NotificationFilterEntity:
      required:
        - expression
        - source
      type: object
      properties:
        source:
          type: string
        expression:
          type: string
        enabled:
          type: boolean
        message:
          type: string
    NotificationPreferenceEntity:
      required:
        - type
      type: object
      properties:
        id:
          type: integer
          format: int64
        user:
          $ref: '#/components/schemas/UserBean'
        type:
          type: string
          enum:
            - WEB
            - EMAIL
        rules:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/NotificationFilterEntity'
    PermissionBean:
      type: object
      properties:
        name:
          type: string
          enum:
            - orgView
            - orgEdit
            - orgAdmin
            - apiView
            - apiEdit
            - apiAdmin
            - clientView
            - clientEdit
            - clientAdmin
            - planView
            - planEdit
            - planAdmin
        organizationId:
          type: string
    UserBean:
      type: object
      properties:
        username:
          type: string
        fullName:
          type: string
        email:
          type: string
        joinedOn:
          type: string
          format: date-time
        locale:
          type: object
          properties:
            language:
              type: string
            displayName:
              type: string
            script:
              type: string
            country:
              type: string
            variant:
              type: string
            extensionKeys:
              uniqueItems: true
              type: array
              items:
                type: string
            unicodeLocaleAttributes:
              uniqueItems: true
              type: array
              items:
                type: string
            unicodeLocaleKeys:
              uniqueItems: true
              type: array
              items:
                type: string
            iso3Language:
              type: string
            iso3Country:
              type: string
            displayLanguage:
              type: string
            displayScript:
              type: string
            displayCountry:
              type: string
            displayVariant:
              type: string
        admin:
          type: boolean
    NotificationDtoObject:
      type: object
      properties:
        id:
          type: integer
          format: int64
        category:
          type: string
          enum:
            - USER_ADMINISTRATION
            - API_ADMINISTRATION
            - API_LIFECYCLE
            - CLIENT_LIFECYCLE
            - SYSTEM
            - OTHER
        reason:
          type: string
        reasonMessage:
          type: string
        status:
          type: string
          enum:
            - OPEN
            - USER_DISMISSED
            - SYSTEM_DISMISSED
        createdOn:
          type: string
          format: date-time
        modifiedOn:
          type: string
          format: date-time
        recipient:
          $ref: '#/components/schemas/UserDto'
        source:
          type: string
        payload:
          type: object
    SearchResultsBeanNotificationDtoObject:
      type: object
      properties:
        beans:
          type: array
          items:
            $ref: '#/components/schemas/NotificationDtoObject'
        totalSize:
          type: integer
          format: int32
    NotificationCriteriaBean:
      type: object
      properties:
        filters:
          type: array
          items:
            $ref: '#/components/schemas/SearchCriteriaFilterBean'
        orderBy:
          $ref: '#/components/schemas/OrderByBean'
        paging:
          $ref: '#/components/schemas/PagingBean'
        pageSize:
          $ref: '#/components/schemas/SearchCriteriaBean'
        page:
          $ref: '#/components/schemas/SearchCriteriaBean'
    UserPermissionsBean:
      type: object
      properties:
        userId:
          type: string
        permissions:
          uniqueItems: true
          type: array
          items:
            $ref: '#/components/schemas/PermissionBean'
    NotificationActionDto:
      required:
        - status
      type: object
      properties:
        markAll:
          type: boolean
        notificationIds:
          type: array
          items:
            type: integer
            format: int64
        status:
          type: string
          enum:
            - OPEN
            - USER_DISMISSED
            - SYSTEM_DISMISSED
    UpdateUserBean:
      type: object
      properties:
        fullName:
          type: string
        email:
          type: string
        locale:
          type: object
          properties:
            language:
              type: string
            displayName:
              type: string
            script:
              type: string
            country:
              type: string
            variant:
              type: string
            extensionKeys:
              uniqueItems: true
              type: array
              items:
                type: string
            unicodeLocaleAttributes:
              uniqueItems: true
              type: array
              items:
                type: string
            unicodeLocaleKeys:
              uniqueItems: true
              type: array
              items:
                type: string
            iso3Language:
              type: string
            iso3Country:
              type: string
            displayLanguage:
              type: string
            displayScript:
              type: string
            displayCountry:
              type: string
            displayVariant:
              type: string
`