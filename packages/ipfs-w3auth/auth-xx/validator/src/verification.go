package main

import (
	"crypto"
	"encoding/base64"
	"fmt"
	"hash"

	"gitlab.com/xx_network/crypto/signature/rsa"
)

type DataForVerify struct {
	PubKey          string `json:"pubKey"`
	ReceptionPubKey string `json:"receptionPubKey"`
	Signature       string `json:"signature"`
	UserName        string `json:"userName"`
}

// verifyVerificationSignature verifies the signature provided from SignVerification.
func verifyVerificationSignature(data *DataForVerify) error {
	// Hash username
	userNameHash := hashUsername(data.UserName)

	// Get pubkey
	pubKeyTrue, err := base64.StdEncoding.DecodeString(data.PubKey)
	if err != nil {
		fmt.Println(err)
		return err
	}

	pubKey, err := rsa.LoadPublicKeyFromPem(pubKeyTrue)
	if err != nil {
		fmt.Println(err)
		return err
	}

	// Convert receptionPubKey and signature
	receptionPubKey, err := base64.StdEncoding.DecodeString(data.ReceptionPubKey)
	if err != nil {
		fmt.Println(err)
		return err
	}

	signature, err := base64.StdEncoding.DecodeString(data.Signature)
	if err != nil {
		fmt.Println(err)
		return err
	}

	// Create hash that was signed
	opts := rsa.NewDefaultOptions()
	opts.Hash = crypto.SHA256
	hashed := makeVerificationSignatureHash(userNameHash, receptionPubKey, opts.Hash.New())

	// Verify signature
	return rsa.Verify(pubKey, opts.Hash, hashed, signature, opts)
}

func makeVerificationSignatureHash(userNameHash, receptionPubKey []byte, h hash.Hash) []byte {
	_, _ = h.Write(receptionPubKey)
	_, _ = h.Write(userNameHash)
	return h.Sum(nil)
}
