# Coinpaprika gRPC API

a cross language implementation of coinpaprika's api for speedy and efficient data transfer / streaming.

[grpc](https://grpc.io/) uses a single connection over http2 to transfer data, so there is less data transferred, and it is done using [protobufs](https://developers.google.com/protocol-buffers/docs/overview) which is a buffer structure so you don't have string parsing then object parsing in whichever language you're in like http.

`protos/v1.proto` folder has the protobuf definition. `server` folder has the server. `client` has an example of what a client might look like, which is used in the `tests/unit` files.

based on the docs available here: [v1.5](https://api.coinpaprika.com/)
