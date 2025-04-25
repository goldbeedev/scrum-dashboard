export default function ApiDocsPage() {
  return (
    <div className="container mx-auto p-6 prose prose-lg max-w-4xl">
      <h1>API Documentation</h1>
      
      <section className="mb-8">
        <h2>Authentication</h2>
        <p>
          All API requests require an API key sent in the <code>x-api-key</code> header.
          For testing, use the following API key:
        </p>
        <pre className="bg-base-200 p-3 rounded"><code>test_api_key_12345</code></pre>
      </section>

      <section className="mb-8">
        <h2>Base URL</h2>
        <p>All API requests should be made to:</p>
        <pre className="bg-base-200 p-3 rounded"><code>https://scrum-dashboard.com/api</code></pre>
      </section>

      <section className="mb-8">
        <h2>Using Postman</h2>
        <p>To test the API using Postman:</p>
        <ol>
          <li>
            <strong>Set up a collection</strong>: Create a new collection for the project
          </li>
          <li>
            <strong>Add Authorization</strong>: For each request, add a header with key <code>x-api-key</code> and value <code>test_api_key_12345</code>
          </li>
          <li>
            <strong>Set Content-Type</strong>: For POST and PUT requests, set the Content-Type header to <code>application/json</code>
          </li>
        </ol>
        <p>
          <strong>Tip:</strong> You can set up an environment variable for your API key and base URL to
          avoid repeating them in each request.
        </p>
      </section>

      <section className="mb-8">
        <h2>Endpoints</h2>
        
        <div className="border rounded-lg p-6 mb-6">
          <h3>List All Records</h3>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1 font-bold">Method:</div>
            <div className="col-span-5 text-success">GET</div>
          </div>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1 font-bold">URL:</div>
            <div className="col-span-5"><code>/api/records</code></div>
          </div>
          <div className="grid grid-cols-6 gap-2 mb-4">
            <div className="col-span-1 font-bold">Description:</div>
            <div className="col-span-5">Returns a list of all records</div>
          </div>

          <h4>Example Response:</h4>
          <pre className="bg-base-200 p-3 rounded overflow-auto">
            <code>{JSON.stringify({
              status: 'success',
              data: [
                {
                  id: 'clq12345abcdef',
                  name: 'Sample Record',
                  description: 'This is a sample record',
                  data: { key1: 'value1', key2: 'value2' },
                  createdAt: '2023-06-01T12:00:00.000Z',
                  updatedAt: '2023-06-01T12:00:00.000Z'
                }
              ]
            }, null, 2)}</code>
          </pre>
        </div>

        <div className="border rounded-lg p-6 mb-6">
          <h3>Create New Record</h3>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1 font-bold">Method:</div>
            <div className="col-span-5 text-info">POST</div>
          </div>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1 font-bold">URL:</div>
            <div className="col-span-5"><code>/api/records</code></div>
          </div>
          <div className="grid grid-cols-6 gap-2 mb-4">
            <div className="col-span-1 font-bold">Description:</div>
            <div className="col-span-5">Creates a new record</div>
          </div>

          <h4>Request Body:</h4>
          <pre className="bg-base-200 p-3 rounded overflow-auto mb-4">
            <code>{JSON.stringify({
              name: 'New Record',
              description: 'This is a new record',
              data: { 
                key1: 'value1',
                key2: 'value2'
              }
            }, null, 2)}</code>
          </pre>

          <h4>Example Response:</h4>
          <pre className="bg-base-200 p-3 rounded overflow-auto">
            <code>{JSON.stringify({
              status: 'success',
              message: 'Record created',
              data: {
                id: 'clq12345abcdef',
                name: 'New Record',
                description: 'This is a new record',
                data: { key1: 'value1', key2: 'value2' },
                createdAt: '2023-06-01T12:00:00.000Z',
                updatedAt: '2023-06-01T12:00:00.000Z'
              }
            }, null, 2)}</code>
          </pre>
        </div>

        <div className="border rounded-lg p-6 mb-6">
          <h3>Get Record</h3>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1 font-bold">Method:</div>
            <div className="col-span-5 text-success">GET</div>
          </div>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1 font-bold">URL:</div>
            <div className="col-span-5"><code>/api/records/{'{id}'}</code></div>
          </div>
          <div className="grid grid-cols-6 gap-2 mb-4">
            <div className="col-span-1 font-bold">Description:</div>
            <div className="col-span-5">Returns a specific record by ID</div>
          </div>

          <h4>Example Response:</h4>
          <pre className="bg-base-200 p-3 rounded overflow-auto">
            <code>{JSON.stringify({
              status: 'success',
              data: {
                id: 'clq12345abcdef',
                name: 'Sample Record',
                description: 'This is a sample record',
                data: { key1: 'value1', key2: 'value2' },
                createdAt: '2023-06-01T12:00:00.000Z',
                updatedAt: '2023-06-01T12:00:00.000Z'
              }
            }, null, 2)}</code>
          </pre>
        </div>

        <div className="border rounded-lg p-6 mb-6">
          <h3>Update Record</h3>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1 font-bold">Method:</div>
            <div className="col-span-5 text-warning">PUT</div>
          </div>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1 font-bold">URL:</div>
            <div className="col-span-5"><code>/api/records/{'{id}'}</code></div>
          </div>
          <div className="grid grid-cols-6 gap-2 mb-4">
            <div className="col-span-1 font-bold">Description:</div>
            <div className="col-span-5">Updates a specific record by ID</div>
          </div>

          <h4>Request Body:</h4>
          <pre className="bg-base-200 p-3 rounded overflow-auto mb-4">
            <code>{JSON.stringify({
              name: 'Updated Record',
              description: 'This record has been updated',
              data: { 
                key1: 'new value',
                key3: 'added value'
              }
            }, null, 2)}</code>
          </pre>

          <h4>Example Response:</h4>
          <pre className="bg-base-200 p-3 rounded overflow-auto">
            <code>{JSON.stringify({
              status: 'success',
              message: 'Record updated',
              data: {
                id: 'clq12345abcdef',
                name: 'Updated Record',
                description: 'This record has been updated',
                data: { key1: 'new value', key3: 'added value' },
                createdAt: '2023-06-01T12:00:00.000Z',
                updatedAt: '2023-06-01T12:30:00.000Z'
              }
            }, null, 2)}</code>
          </pre>
        </div>

        <div className="border rounded-lg p-6">
          <h3>Delete Record</h3>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1 font-bold">Method:</div>
            <div className="col-span-5 text-error">DELETE</div>
          </div>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="col-span-1 font-bold">URL:</div>
            <div className="col-span-5"><code>/api/records/{'{id}'}</code></div>
          </div>
          <div className="grid grid-cols-6 gap-2 mb-4">
            <div className="col-span-1 font-bold">Description:</div>
            <div className="col-span-5">Deletes a specific record by ID</div>
          </div>

          <h4>Example Response:</h4>
          <pre className="bg-base-200 p-3 rounded overflow-auto">
            <code>{JSON.stringify({
              status: 'success',
              message: 'Record deleted'
            }, null, 2)}</code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2>Postman Collection</h2>
        <p>
          You can import the following Postman collection to quickly get started:
        </p>
        <pre className="bg-base-200 p-3 rounded overflow-auto">
          <code>{JSON.stringify({
            "info": {
              "_postman_id": "12345678-abcd-1234-efgh-123456789abc",
              "name": "Scrum Dashboard API",
              "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
            },
            "item": [
              {
                "name": "Get all records",
                "request": {
                  "method": "GET",
                  "header": [
                    {
                      "key": "x-api-key",
                      "value": "{{api_key}}",
                      "type": "text"
                    }
                  ],
                  "url": {
                    "raw": "{{base_url}}/api/records",
                    "host": ["{{base_url}}"],
                    "path": ["api", "records"]
                  }
                }
              },
              {
                "name": "Create record",
                "request": {
                  "method": "POST",
                  "header": [
                    {
                      "key": "x-api-key",
                      "value": "{{api_key}}",
                      "type": "text"
                    },
                    {
                      "key": "Content-Type",
                      "value": "application/json",
                      "type": "text"
                    }
                  ],
                  "body": {
                    "mode": "raw",
                    "raw": "{\n  \"name\": \"New Record\",\n  \"description\": \"This is a new record\",\n  \"data\": {\n    \"key1\": \"value1\",\n    \"key2\": \"value2\"\n  }\n}"
                  },
                  "url": {
                    "raw": "{{base_url}}/api/records",
                    "host": ["{{base_url}}"],
                    "path": ["api", "records"]
                  }
                }
              }
            ]
          }, null, 2)}</code>
        </pre>
        <p className="mt-2">
          <strong>Note:</strong> Create a Postman environment with variables <code>base_url</code> and <code>api_key</code>.
        </p>
      </section>

      <section className="mb-8">
        <h2>Error Handling</h2>
        <p>The API returns the following error codes:</p>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Status Code</th>
              <th className="border p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">400</td>
              <td className="border p-2">Bad Request - Missing required fields</td>
            </tr>
            <tr>
              <td className="border p-2">401</td>
              <td className="border p-2">Unauthorized - Invalid or missing API key</td>
            </tr>
            <tr>
              <td className="border p-2">404</td>
              <td className="border p-2">Not Found - Record not found</td>
            </tr>
            <tr>
              <td className="border p-2">500</td>
              <td className="border p-2">Server Error - Something went wrong on the server</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2>CURL Examples</h2>
        
        <div className="bg-base-200 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Get all records</h3>
          <pre className="bg-base-300 p-4 rounded overflow-auto max-w-full text-sm">
{`curl -X GET "https://scrum-dashboard.com/api/records" \\
  -H "x-api-key: test_api_key_12345"`}
          </pre>
        </div>
        
        <div className="bg-base-200 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Create a record</h3>
          <pre className="bg-base-300 p-4 rounded overflow-auto max-w-full text-sm">
{`curl -X POST "https://scrum-dashboard.com/api/records" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: test_api_key_12345" \\
  -d '{"name":"New Record","description":"This is a new record","data":{"key1":"value1","key2":"value2"}}'`}
          </pre>
        </div>
        
        <div className="bg-base-200 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Get a specific record</h3>
          <pre className="bg-base-300 p-4 rounded overflow-auto max-w-full text-sm">
{`curl -X GET "https://scrum-dashboard.com/api/records/RECORD_ID" \\
  -H "x-api-key: test_api_key_12345"`}
          </pre>
        </div>
        
        <div className="bg-base-200 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Update a record</h3>
          <pre className="bg-base-300 p-4 rounded overflow-auto max-w-full text-sm">
{`curl -X PUT "https://scrum-dashboard.com/api/records/RECORD_ID" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: test_api_key_12345" \\
  -d '{"name":"Updated Record","description":"This record has been updated","data":{"key1":"new value","key3":"added value"}}'`}
          </pre>
        </div>
        
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Delete a record</h3>
          <pre className="bg-base-300 p-4 rounded overflow-auto max-w-full text-sm">
{`curl -X DELETE "https://scrum-dashboard.com/api/records/RECORD_ID" \\
  -H "x-api-key: test_api_key_12345"`}
          </pre>
        </div>
      </section>
    </div>
  );
} 