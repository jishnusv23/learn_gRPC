const PROTO_PATH = "./proto/user.proto";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { v4 as uuidv4 } from "uuid";

function main() {
  // Setup the type definition
  let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
  });

  const userProto = grpc.loadPackageDefinition(packageDefinition);

  const server = new grpc.Server();

  const Users = [
    {
      name: "jishnu",
      email: "jishnu@gmail.com",
      age: 34,
    },
  ];

  server.addService(userProto.UserService.service, {
    getUsers: (_, callback) => {
      callback(null, { user: Users });
    },
    addUser: (call, callback) => {
      const user = call.request;
      Users.push(user);
      callback(null, user);
    },
    UpdateName: (call, callback) => {
      let exsistUser = Users.find((data) => data.email === call.request.email);
      if (exsistUser) {
        console.log("--->🤺");
        (exsistUser.name = call.request.name), callback(null, exsistUser);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "not found",
        });
      }
    },
  });

  server.bindAsync(
    "0.0.0.0:30043",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error("🤖-> Server running something wrong");
        return;
      }
      console.log(`👽-> Server running at http://127.0.0.1:${port}`);
    }
  );
}
main();
