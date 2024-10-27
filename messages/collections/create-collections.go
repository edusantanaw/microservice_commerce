package collections

func CreateCollections() error {
	if err := createCustomerCollection(); err != nil {
		return err
	}
	return nil
}
